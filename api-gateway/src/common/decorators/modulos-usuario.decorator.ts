import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EncryptUtil } from '@Utils';
import { MODULOS_KEY } from '@Constants';

export const ModulosUsuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string[] => {
    const req = ctx.switchToHttp().getRequest();
    return EncryptUtil.decryptBase64(req.headers['modulos'], MODULOS_KEY).split(
      ',',
    );
  },
);
