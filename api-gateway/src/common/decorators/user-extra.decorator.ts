import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioInfoExtra } from 'src/core/auth/dto/login.dto';
import { getCookieAccessKey } from '@Constants';
import { EncryptUtil } from '../utils/encrypt.util';

export const UsuarioExtra = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsuarioInfoExtra => {
    const req = ctx.switchToHttp().getRequest();
    const dataString = EncryptUtil.decryptBase64(
      req.headers['usuario-extra'],
      getCookieAccessKey(),
    );

    if (!dataString) return null;

    return JSON.parse(dataString);
  },
);
