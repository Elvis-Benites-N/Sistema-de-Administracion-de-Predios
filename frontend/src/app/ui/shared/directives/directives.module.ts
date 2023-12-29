import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoAlgunModuloDirective } from './acceso-algun-modulo.directive';
import { AccesoAlgunaFuncionalidadDirective } from './acceso-alguna-funcionalidad.directive';
import { AccesoDirective } from './acceso.directive';
import { DebounceDirective } from './debounce.directive';

const directives = [
  AccesoAlgunModuloDirective,
  AccesoAlgunaFuncionalidadDirective,
  AccesoDirective,
  DebounceDirective,
];

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives,
})
export class DirectivesModule {}
