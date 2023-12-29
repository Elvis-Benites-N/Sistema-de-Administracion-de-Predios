import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { CatalogoResponse } from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { ListarEquivalenciasHandler } from '../../catalogo.handler';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { SafetyCallComponent } from 'src/app/ui/shared/safety-call/safety-call.component';
import { HttpErrorResponse } from '@angular/common/http';

export interface EliminarEquivalenciaQuery {
  id: number;
}

@Component({
  selector: 'modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss'],
})
export class ModalEliminarComponent implements OnInit, OnChanges {
  @ViewChild('safetyCall')
  safetyCall: SafetyCallComponent;

  @Input()
  isModalVisible: boolean;

  @Input()
  cerrarModal: Function;

  @Input()
  idEquivalencia: number;

  public mostrarModaEliminar: boolean;
  itemDetalles: CatalogoResponse;
  isEmitted: boolean;

  constructor(
    private readonly businessService: BusinessService,
    private listarEquivalenciasHandler: ListarEquivalenciasHandler,
    private notificationService: NzNotificationService,
    private message: NzNotificationService
  ) {
    this.mostrarModaEliminar = false;
    this.isEmitted = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible']) {
      if (changes['isModalVisible'].currentValue === true) {
        this.isEmitted = false;
        this.cargarData();
      }
    }
  }

  ngOnInit(): void {}

  async cargarData(): Promise<void> {
    if (!this.idEquivalencia) return;

    this.itemDetalles = null;

    this.itemDetalles = await this.businessService.methodGet<
      CatalogoResponse,
      {}
    >({
      url: ENDPOINTS.catalogo.consulta.verDetalle,
      params: [this.idEquivalencia.toString()],
    });
  }
  eliminarEquivalenciaPorCompletoValidado() {
    this.businessService
      .methodDelete<ResponseAPI, EliminarEquivalenciaQuery>({
        url: ENDPOINTS.catalogo.consulta.eliminarEquivalencia,
        params: [this.idEquivalencia.toString()],
      })
      .then((response) => {
        if (response) {
          this.cerrarModal();
          this.onSucessCall(response);
          this.listarEquivalenciasHandler.refrescarData();
        }
      })
      .catch((error) => {
        this.notificationService.error(
          '¡ERROR!',
          (error as HttpErrorResponse).error.message
        );
        this.isEmitted = true;
      });
  }

  onSucessCall(response: ResponseAPI) {
    this.cerrarModal();
    this.listarEquivalenciasHandler.refrescarData();
    this.message.success(
      '¡ELIMINADO!',
      'Se ha eliminado correctamente la relación'
    );
  }
}
