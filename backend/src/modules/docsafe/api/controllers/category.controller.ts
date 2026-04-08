import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from '../../application/services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { JwtAuthGuard } from '../../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/auth/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('ADMIN')
  async createCategory(@Req() req: any, @Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user.tenantId, body);
  }

  @Get()
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getCategories(@Req() req: any) {
    return this.categoryService.getCategories(req.user.tenantId);
  }
}
