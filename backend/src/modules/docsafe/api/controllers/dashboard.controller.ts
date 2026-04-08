import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from '../../application/services/dashboard.service';
import { JwtAuthGuard } from '../../../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/auth/guards/roles.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @Roles('ADMIN', 'USER', 'AUDITOR')
  async getSummary(@Req() req: any) {
    return this.dashboardService.getDashboardSummary(req.user.tenantId);
  }
}
