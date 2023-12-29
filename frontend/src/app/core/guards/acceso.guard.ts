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
export class AccesoGuard implements CanActivate, CanLoad {
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
    let modulo = (route.data['modulo'] ?? []) as number[];

    if (modulo.length !== 3) {
      this.router.navigateByUrl('/auth/acceso-denegado');
      return false;
    }

    if (
      this.authService.modulos?.some((m) =>
        m.endsWith(`${modulo[0]}-${modulo[1]}-${modulo[2]}`)
      )
    ) {
      return true;
    }
    this.router.navigateByUrl('/auth/acceso-denegado');

    return false;
  }
}
