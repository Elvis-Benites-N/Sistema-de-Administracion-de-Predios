import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { CallbackPage } from './callback/callback.page';
import { SesionNoIniciadaGuard } from 'src/app/core/guards/sesion-no-iniciada.guard';
import { SesionExpiradaPage } from './sesion-expirada/sesion-expirada.page';
import { AccesoDenegadoPage } from './acceso-denegado/acceso-denegado.page';

const routes: CustomRoutes = [
  {
    path: 'callback',
    component: CallbackPage,
    canActivate: [SesionNoIniciadaGuard],
    data: {
      webtitle: 'Espera un momento | SGP - UNMSM',
      webdescription: 'Ruta de espera mientras se procesa el login',
    },
  },
  {
    path: 'sesion-expirada',
    component: SesionExpiradaPage,
    canActivate: [SesionNoIniciadaGuard],
    data: {
      webtitle: 'Sesión expirada | SGP - UNMSM',
      webdescription:
        'Tú sesión ha expirado, por favor, vuelve a loguearte en el SGP',
    },
  },
  {
    path: 'acceso-denegado',
    component: AccesoDenegadoPage,
    data: {
      webtitle: 'Acceso Denegado | SGP - UNMSM',
      webdescription:
        'Usted no tiene acceso, por favor, vuelve a loguearte en el SGP',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
