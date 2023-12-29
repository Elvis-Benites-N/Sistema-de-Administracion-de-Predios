import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagosComponent } from './pagos.component';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { AlgunaFuncionalidadGuard } from 'src/app/core/guards/alguna-funcionalidad.guard';

const routes: CustomRoutes = [
  {
    path: '',
    component: PagosComponent,
    canActivate: [AlgunaFuncionalidadGuard],
    data: {
      webtitle: 'Pagos | Predios',
      description: 'Módulo acerca de los pagos del SGP',
      title: 'Bienvenido al módulo de pagos',
      webdescription: 'Acerca del módulo de pagos del SGP',
      breadcrumb: {
        label: 'Pagos',
        routerlink: '/pagos',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
