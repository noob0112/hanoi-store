import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_STATUS_ENUM } from '../../../modules/users/users.constant';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.status === USER_STATUS_ENUM.ACTION) return true;
    return false;
  }
}
