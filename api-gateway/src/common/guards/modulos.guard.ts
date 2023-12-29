import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs/internal/Observable';
import { MODULOS_KEY } from '@Constants';
import { EncryptUtil } from '@Utils';

@Injectable()
export class ModulosGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const modulosAcceso = this.reflector.get<number[]>(
      'modulos',
      context.getHandler(),
    );

    if (!modulosAcceso) return true;

    const req = context.switchToHttp().getRequest();
    const modulosUsuario = EncryptUtil.decryptBase64(
      req.headers['modulos'],
      MODULOS_KEY,
    ).split(',');

    return modulosUsuario.some((m) =>
      m.endsWith(`${modulosAcceso[0]}-${modulosAcceso[1]}-${modulosAcceso[2]}`),
    );
  }
}
