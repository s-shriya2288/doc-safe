import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary(tenantId: string) {
    const totalDocuments = await this.prisma.document.count({ where: { tenant_id: tenantId } });
    
    const expiredDocuments = await this.prisma.document.count({ 
      where: { 
        tenant_id: tenantId, 
        OR: [
          { status: 'EXPIRED' },
          { expiry_date: { lt: new Date() } }
        ]
      } 
    });
    
    const upcomingRenewals = await this.prisma.renewalRecord.count({ 
      where: { 
        tenant_id: tenantId, 
        status: 'UPCOMING'
      } 
    });

    return {
      totalDocuments,
      expiredDocuments,
      upcomingRenewals
    };
  }
}
