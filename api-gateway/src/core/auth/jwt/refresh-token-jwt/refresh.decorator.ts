import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshSCAToken } from '@Interfaces';

export const Refresh = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RefreshSCAToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.refresh as RefreshSCAToken;
  },
);
