import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const providedApiKey = request.headers['x-api-key'];

    const expectedApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!expectedApiKey) {
      throw new UnauthorizedException('API key is not configured');
    }

    if (providedApiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
