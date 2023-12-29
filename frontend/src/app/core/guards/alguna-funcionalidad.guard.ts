import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
} from '@angular/router';
import { AuthService } from '../controllers/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlgunaFuncionalidadGuard implements CanActivate, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.validate(route);
  }

  canLoad(route: ActivatedRouteSnapshot): boolean {
    return this.validate(route);
  }

  private validate(route: ActivatedRouteSnapshot): boolean {
    let funcionalidades = (route.data['funcionalidades'] ?? []) as number[];

    if (funcionalidades.length === 0) {
      this.router.navigateByUrl('/auth/acceso-denegado');
      return false;
    }

    if (
      this.authService.modulos?.some((m) => {
        const f = Number(m.split('-')[2]);

        return funcionalidades.includes(f);
      })
    ) {
      return true;
    }

    this.router.navigateByUrl('/auth/acceso-denegado');

    return false;
  }
}
