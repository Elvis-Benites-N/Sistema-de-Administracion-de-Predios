import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Directive({
  selector: '[accesoAlgunModulo]',
})
export class AccesoAlgunModuloDirective {
  public tieneAcceso: boolean = false;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authService: AuthService
  ) {}

  @Input() set accesoAlgunModulo(modulos: number[]) {
    if (!modulos || modulos.length === 0) {
      this.viewContainer.clear();
      this.tieneAcceso = false;
      return;
    }

    if (
      modulos.some((m) =>
        this.authService.modulos?.some(
          (mo) => mo.split('-')[1] === m.toString()
        )
      )
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.tieneAcceso = true;
    } else {
      this.viewContainer.clear();
      this.tieneAcceso = false;
    }
  }
}
