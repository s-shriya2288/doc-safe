import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the controller already returns the standardized format, don't wrap it again
        if (data && typeof data === 'object' && 'success' in data && 'message' in data && 'data' in data) {
          return data as Response<T>;
        }
        
        return {
          success: true,
          message: 'Operation successful',
          data: data || {},
        };
      }),
    );
  }
}
