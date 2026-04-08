import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = 
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';
        
    const data = 
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    response
      .status(status)
      .send({
        success: false,
        message,
        data: typeof data === 'object' && data !== null && 'message' in data ? (data as any).message : data || {},
      });
  }
}
