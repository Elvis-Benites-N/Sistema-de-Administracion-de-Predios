import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtRefreshGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super({
      property: 'refresh',
    });
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ) {
    return user;
  }
}
