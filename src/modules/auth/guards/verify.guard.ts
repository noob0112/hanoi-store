import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { STATUS_ENUM } from 'src/modules/users/users.constant';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.status === STATUS_ENUM.ACTION) return true;
    return false;
  }
}
