import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from '../../application/services/document.service';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { JwtAuthGuard } from '../../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/auth/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  async createDocument(@Req() req: any, @Body() body: CreateDocumentDto) {
    return this.documentService.createDocument(req.user.tenantId, body);
  }

  @Get()
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getDocuments(@Req() req: any) {
    return this.documentService.getDocuments(req.user.tenantId);
  }
}
