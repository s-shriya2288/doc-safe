import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { CreateDocumentDto } from '../../api/dtos/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(tenantId: string, data: CreateDocumentDto) {
    if (data.issue_date && data.expiry_date) {
      if (new Date(data.expiry_date) < new Date(data.issue_date)) {
        throw new BadRequestException('Expiry date must be greater than or equal to issue date');
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const doc = await tx.document.create({
        data: {
          title: data.title,
          description: data.description,
          category_id: data.category_id,
          issue_date: data.issue_date ? new Date(data.issue_date) : null,
          expiry_date: data.expiry_date ? new Date(data.expiry_date) : null,
          tenant_id: tenantId,
          status: 'DRAFT',
        },
      });

      await tx.documentEvent.create({
        data: {
          tenant_id: tenantId,
          document_id: doc.id,
          action: 'CREATED_DOCUMENT',
          performed_by: tenantId, // placeholder for user UUID
        }
      });

      return doc;
    });
  }

  async getDocuments(tenantId: string) {
    return this.prisma.document.findMany({
      where: { tenant_id: tenantId },
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });
  }
}
