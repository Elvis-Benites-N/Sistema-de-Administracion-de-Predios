import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackPage } from './callback/callback.page';
import { SesionExpiradaPage } from './sesion-expirada/sesion-expirada.page';
import { AccesoDenegadoPage } from './acceso-denegado/acceso-denegado.page';
import { NzSpaceModule } from 'ng-zorro-antd/space';
// NG ZORR

@NgModule({
  declarations: [CallbackPage, SesionExpiradaPage, AccesoDenegadoPage],
  imports: [CommonModule, AuthRoutingModule, NzSpaceModule],
})
export class AuthModule {}
