import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { CreateCategoryDto } from '../../api/dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(tenantId: string, data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        tenant_id: tenantId,
      },
    });
  }

  async getCategories(tenantId: string) {
    return this.prisma.category.findMany({
      where: { tenant_id: tenantId },
      orderBy: { created_at: 'desc' },
    });
  }
}
