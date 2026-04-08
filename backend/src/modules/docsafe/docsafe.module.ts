import { Module } from '@nestjs/common';
import { CategoryController } from './api/controllers/category.controller';
import { CategoryService } from './application/services/category.service';
import { DocumentController } from './api/controllers/document.controller';
import { DocumentService } from './application/services/document.service';

@Module({
  imports: [],
  controllers: [CategoryController, DocumentController],
  providers: [CategoryService, DocumentService],
})
export class DocsafeModule {}
