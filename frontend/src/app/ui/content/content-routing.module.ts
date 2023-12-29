import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULOS } from 'src/app/core/constants/modulos.contant';
import { AlgunaFuncionalidadGuard } from 'src/app/core/guards/alguna-funcionalidad.guard';
import { SesionIniciadaGuard } from 'src/app/core/guards/sesion-iniciada.guard';
import { CustomRoutes } from 'src/app/core/interfaces/custom-route.interface';
import { ContentComponent } from './content.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContratosComponent } from './pages/contratos/contratos.component';

const routes: CustomRoutes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [SesionIniciadaGuard],
    data: {
      breadcrumb: {
        icon: 'home',
        label: 'Inicio',
        routerlink: '/',
      },
    },

    children: [
      {
        path: '',
        component: InicioComponent,
        data: {
          webtitle: 'Inicio | Predios',
          webdescription: 'Acerca del Sistema de Administración de Predios',
          title: 'Bienvenido a SGP',
          breadcrumb: null,
        },
      },
      {
        path: 'pagos',
        canLoad: [AlgunaFuncionalidadGuard],
        data: {
          funcionalidades: [
            MODULOS.PAGOS.funcionalidades.GENERAR_COMPROBANTE_PAGOS.id,
            MODULOS.PAGOS.funcionalidades.LISTARPAGOS.id,
            MODULOS.PAGOS.funcionalidades.VER_DETALLE_PAGOS.id,
          ],
        },
        loadChildren: () =>
          import('./pages/pagos/pagos.module').then((m) => m.PagosModule),
      },
      {
        path: 'comprobantes',
        canActivate: [AlgunaFuncionalidadGuard],
        data: {
          funcionalidades: [
            MODULOS.COMPROBANTES.funcionalidades.LISTAR_COMPROBANTES.id,
            MODULOS.COMPROBANTES.funcionalidades.DESCARGAR_COMPROBANTES.id,
            MODULOS.COMPROBANTES.funcionalidades.ENVIAR_CORREO_COMPROB.id,
            MODULOS.COMPROBANTES.funcionalidades.VISUALIZAR_COMPROBANTES.id,
          ],
        },
        loadChildren: () =>
          import('./pages/comprobantes/comprobantes.module').then(
            (m) => m.ComprobantesModule
          ),
      },
      {
        path: 'indicadores/cuentas',
        component: CuentasComponent,
        data: {
          breadcrumb: {
            label: 'Indicadores / cuentas',
            routerlink: '/indicadores/cuentas',
          },
        },
      },
      {
        path: 'indicadores/contratos',
        component: ContratosComponent,
        data: {
          breadcrumb: {
            label: 'Indicadores / contratos',
            routerlink: '/indicadores/contratos',
          },
        },
      },
      {
        path: 'catalogo',
        canActivate: [AlgunaFuncionalidadGuard],
        data: {
          funcionalidades: [
            MODULOS.CATALOGO.funcionalidades.AÑADIR_ITEM.id,
            MODULOS.CATALOGO.funcionalidades.VISUALIZAR_CATALOGO.id,
          ],
        },
        loadChildren: () =>
          import('./pages/catalogo/catalogo.module').then(
            (m) => m.CatalogoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
