import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Directive({
  selector: '[acceso]',
})
export class AccesoDirective {
  public tieneAcceso: boolean = false;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authService: AuthService
  ) {}

  @Input() set acceso(modulo: number[]) {
    if (!modulo || modulo.length !== 3) {
      this.viewContainer.clear();
      this.tieneAcceso = false;
      return;
    }

    const moduloAcceso = `${modulo[0]}-${modulo[1]}-${modulo[2]}`;

    if (this.authService.modulos?.some((e) => e.endsWith(moduloAcceso))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.tieneAcceso = true;
    } else {
      this.viewContainer.clear();
      this.tieneAcceso = false;
    }
  }
}
