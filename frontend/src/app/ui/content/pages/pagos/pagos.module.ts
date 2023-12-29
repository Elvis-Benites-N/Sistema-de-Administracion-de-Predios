import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FiltrosPagosComponent } from './filtros-pagos/filtros-pagos.component';
import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';
import { TablaPagosComponent } from './tabla-pagos/tabla-pagos.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/ui/shared/directives/directives.module';
import { ModalGenerarComponent } from './tabla-pagos/modal-generar/modal-generar.component';
import { ModalVerComponent } from './tabla-pagos/modal-ver/modal-ver.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';

@NgModule({
  declarations: [
    PagosComponent,
    FiltrosPagosComponent,
    TablaPagosComponent,
    ModalVerComponent,
    ModalGenerarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagosRoutingModule,
    DirectivesModule,
    SafetyCallComponent,

    //NG ZORRO
    NzToolTipModule,
    NzTagModule,
    NzPaginationModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule,
    NzDatePickerModule,
    NzAlertModule,
    NzSelectModule,
    NzTypographyModule,
    NzSpaceModule,
    NzGridModule,
    NzInputModule,
    NzDividerModule,
    NzCardModule,
    NzModalModule,
    NzStepsModule,
    NzSkeletonModule,
    NzSpinModule,
    NzEmptyModule,
    NzNotificationModule,
  ],
})
export class PagosModule {}
