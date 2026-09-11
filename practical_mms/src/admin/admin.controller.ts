import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminApiKeyGuard } from 'src/admin/admin-api-key/admin-api-key.guard';

@Controller('admin')
export class AdminController {
  @Get('stats')
  @UseGuards(AdminApiKeyGuard)
  getStats() {
    return {
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
    };
  }
}
