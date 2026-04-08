import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { DocsafeModule } from './modules/docsafe/docsafe.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [PrismaModule, DocsafeModule, AuthModule],
})
export class AppModule {}
