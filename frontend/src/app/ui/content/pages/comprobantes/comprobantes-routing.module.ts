import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { ComprobantesComponent } from './comprobantes.component';
import { AlgunaFuncionalidadGuard } from 'src/app/core/guards/alguna-funcionalidad.guard';

const routes: CustomRoutes = [
  {
    path: '',
    canActivate: [AlgunaFuncionalidadGuard],
    component: ComprobantesComponent,
    data: {
      webtitle: 'Comprobantes | Predios',
      description: 'Módulo acerca de los comprobantes del SGP',
      title: 'Bienvenido al módulo de comprobantes',
      webdescription: 'Acerca del módulo de Comprobantes del SGP',
      breadcrumb: {
        label: 'Comprobantes',
        routerlink: '/comprobantes',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprobantesRoutingModule {}
