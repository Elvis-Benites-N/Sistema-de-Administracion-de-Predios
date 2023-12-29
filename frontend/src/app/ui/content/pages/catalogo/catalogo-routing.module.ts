import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { CatalogoComponent } from './catalogo.component';
import { AlgunaFuncionalidadGuard } from 'src/app/core/guards/alguna-funcionalidad.guard';

const routes: CustomRoutes = [
  {
    path: '',
    canActivate: [AlgunaFuncionalidadGuard],
    component: CatalogoComponent,
    data: {
      webtitle: 'Catálogo | Predios',
      description: 'Módulo acerca del catálogo del SGP',
      title: 'Bienvenido al módulo de catálogo',
      webdescription: 'Acerca del módulo de catálogo del SGP',
      breadcrumb: {
        label: 'Catálogo',
        routerlink: '/catalogos',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoRoutingModule {}
