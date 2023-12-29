import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesionNoIniciadaGuard } from './core/guards/sesion-no-iniciada.guard';
import { SesionIniciadaGuard } from './core/guards/sesion-iniciada.guard';
import { CustomRoutes } from './core/interfaces/custom-route.interface';

const routes: CustomRoutes = [
  {
    path: 'landing',
    canActivate: [SesionNoIniciadaGuard],
    data: {
      webtitle: 'SISTEMA DE ADMINISTRACIÓN DE PREDIOS - UNMSM',
    },
    loadComponent: () =>
      import('./ui/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canLoad: [SesionIniciadaGuard],
    loadChildren: () =>
      import('./ui/content/content.module').then((m) => m.ContentModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
