import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../controllers/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SesionIniciadaGuard implements CanActivate, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    return this.validate();
  }

  canLoad(): boolean {
    return this.validate();
  }

  private validate(): boolean {
    if (this.authService.existeSesion()) return true;

    this.router.navigateByUrl('/landing');

    return false;
  }
}
