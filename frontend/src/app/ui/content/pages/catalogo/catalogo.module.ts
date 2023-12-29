import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from 'src/app/ui/shared/directives/directives.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { FiltrosCatalogoComponent } from './filtros-catalogo/filtros-catalogo.component';
import { ModalCrearComponent } from './filtros-catalogo/modal-crear/modal-crear.component';
import { ModalEliminarComponent } from './tabla-catalogo/modal-eliminar/modal-eliminar.component';
import { TablaCatalogoComponent } from './tabla-catalogo/tabla-catalogo.component';
import { ModalDetallesComponent } from './tabla-catalogo/modal-detalles/modal-detalles.component';
import { ModalEditarComponent } from './tabla-catalogo/modal-editar/modal-editar.component';
import { IdFormatPipe } from 'src/app/ui/shared/pipes/id-format.pipe';
import { DateFormatPipe } from 'src/app/ui/shared/pipes/date-format.pipe';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';

@NgModule({
  declarations: [
    CatalogoComponent,
    FiltrosCatalogoComponent,
    TablaCatalogoComponent,
    ModalCrearComponent,
    ModalEliminarComponent,
    ModalDetallesComponent,
    ModalEditarComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    NzToolTipModule,
    SafetyCallComponent,
    NzModalModule,
    NzTypographyModule,
    NzTagModule,
    NzSpaceModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzSkeletonModule,
    NzPaginationModule,
    CatalogoRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzEmptyModule,
    NzIconModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzTableModule,
    NzNotificationModule,
    IdFormatPipe,
    DateFormatPipe,
  ],
})
export class CatalogoModule {}
