import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Directive({
  selector: '[accesoAlgunaFuncionalidad]',
})
export class AccesoAlgunaFuncionalidadDirective {
  public tieneAcceso: boolean = false;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authService: AuthService
  ) {}

  @Input() set accesoAlgunaFuncionalidad(funcionalidades: number[]) {
    if (!funcionalidades || funcionalidades.length === 0) {
      this.viewContainer.clear();
      this.tieneAcceso = false;
      return;
    }

    if (
      this.authService.modulos?.some((mo) =>
        funcionalidades.includes(Number(mo.split('-')[2]))
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
