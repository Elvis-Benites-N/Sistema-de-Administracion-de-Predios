import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';

@Component({
  selector: 'modal-comprobante-pdf',
  templateUrl: './modal-comprobante-pdf.component.html',
  styleUrls: ['./modal-comprobante-pdf.component.scss'],
})
export class ModalComprobantePdfComponent implements OnInit {
  @ViewChild('safetyCall')
  safetyCall: SafetyCallComponent;

  public archivo: Blob;

  @Input()
  isModalVisible: boolean;

  @Input()
  cerrarModal: Function;

  @Input()
  id: string;

  constructor(
    private readonly businessService: BusinessService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible']) {
      if (changes['isModalVisible'].currentValue === true) {
        this.cargarData();
      }
    }
  }

  cargarData() {
    this.businessService

      .methodGetReport<any>({
        url: ENDPOINTS.comprobantes.consulta.verPdf,
        params: [this.id],
      })
      .then((res) => (this.archivo = res))

      .catch((error) => {
        this.notificationService.error('¡ERROR!', 'El comprobante no existe');
        this.safetyCall.errorMessage = ErrorUtil.getApiErrorMessage(error);
      });
  }
}
