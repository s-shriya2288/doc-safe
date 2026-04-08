import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async autoLogin(email: string) {
    // Auto-create user logic for Phase 1 DB seeding/mocking
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Default tenant UUID mock
      const tenantId = '00000000-0000-0000-0000-000000000001'; 
      user = await this.prisma.user.create({
        data: {
          email,
          password: await bcrypt.hash('password123', 10),
          tenant_id: tenantId,
          role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER',
        },
      });
    }

    const payload = { email: user.email, sub: user.id, role: user.role, tenantId: user.tenant_id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id
      }
    };
  }
}
