import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TituloComponent } from './titulo/titulo.component';

// NgZorro Library

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DirectivesModule } from '../shared/directives/directives.module';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { ContratosComponent } from './pages/contratos/contratos.component';

@NgModule({
  declarations: [
    TituloComponent,
    InicioComponent,
    ContentComponent,
    CuentasComponent,
    ContratosComponent,
  ],
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    ContentRoutingModule,
    NzLayoutModule,
    NzGridModule,
    NzTypographyModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzAvatarModule,
    DirectivesModule,
  ],
})
export class ContentModule {}
