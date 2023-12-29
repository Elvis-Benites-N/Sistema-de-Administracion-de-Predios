import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioSCAToken } from '@Interfaces';

export const Usuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsuarioSCAToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UsuarioSCAToken;
  },
);
