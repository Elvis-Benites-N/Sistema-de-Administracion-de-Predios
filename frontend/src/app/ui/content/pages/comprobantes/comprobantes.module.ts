import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from 'src/app/ui/shared/directives/directives.module';
import { ComprobantesRoutingModule } from './comprobantes-routing.module';
import { ComprobantesComponent } from './comprobantes.component';
import { FiltrosComprobantesComponent } from './filtros-comprobantes/filtros-comprobantes.component';
import { TablaComprobantesComponent } from './tabla-comprobantes/tabla-comprobantes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComprobantePdfComponent } from './tabla-comprobantes/modal-comprobante-pdf/modal-comprobante-pdf.component';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ModalCorreoComponent } from './tabla-comprobantes/modal-correo/modal-correo.component';

@NgModule({
  declarations: [
    ComprobantesComponent,
    FiltrosComprobantesComponent,
    TablaComprobantesComponent,
    ModalComprobantePdfComponent,
    ModalCorreoComponent,
  ],
  imports: [
    CommonModule,
    ComprobantesRoutingModule,
    DirectivesModule,
    ReactiveFormsModule,
    SafetyCallComponent,

    //NG ZORRO
    NzSpaceModule,
    NzTagModule,
    NzSkeletonModule,
    NzModalModule,
    NzNotificationModule,
    NzEmptyModule,
    NgxExtendedPdfViewerModule,
    NzSpinModule,
    NzToolTipModule,
    NzPaginationModule,
    NzCardModule,
    NzInputModule,
    NzGridModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
  ],
})
export class ComprobantesModule {}
