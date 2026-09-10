import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.body);

    if (
      request.body.username === 'admin' &&
      request.body.password === 'admin123'
    ) {
      return true;
    }

    throw new BadRequestException('Invalid Credentials');
  }
}
