import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseCreacionComponent } from 'src/app/core/base-components/base-creacion/base-creacion.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { ComprobanteCrearRequest } from 'src/app/core/controllers/services/business/dto/comprobantes/comprobantes.dto';
import { PagosDetallesResponse } from 'src/app/core/controllers/services/business/dto/pagos/pagos-detalle.dto';

import { TipoSeleccionEnum } from 'src/app/core/enums/tipo-comprobante-seleccion.enums';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { ComprobanteCrearForm } from './modal-generar.form';
import { DetraccionComprobantesResponse } from 'src/app/core/controllers/services/business/dto/comprobantes/detraccion-comprobantes.dto';
import { HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { ListarPagosHandler } from '../../pagos.handler';

@Component({
  selector: 'modal-generar',
  templateUrl: './modal-generar.component.html',
  styleUrls: ['./modal-generar.component.scss'],
})
export class ModalGenerarComponent
  extends BaseCreacionComponent<
    {},
    ComprobanteCrearForm,
    ComprobanteCrearRequest,
    ResponseAPI
  >
  implements OnInit, OnChanges
{
  @Input()
  isModalVisible: boolean;

  @Input()
  cerrarModal: Function;

  @Input()
  idDetalle: number;

  itemDetalles: PagosDetallesResponse;
  infoDetraccion: DetraccionComprobantesResponse;

  public tipoSeleccion: TipoSeleccionEnum;
  public TipoSeleccionType = TipoSeleccionEnum;
  public isModalFacturaShown: boolean;
  public isModalBoletaShown: boolean;
  public detraccionResult: number;

  constructor(
    injector: Injector,
    private listarPagosHandler: ListarPagosHandler
  ) {
    super(injector, ENDPOINTS.comprobantes.consulta.listado);
    this.isModalFacturaShown = false;
    this.isModalBoletaShown = false;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible']) {
      if (changes['isModalVisible'].currentValue === true) {
        this.cargarData();

        this.formWrapper.formulario.patchValue({
          idPago: this.idDetalle,
        });
      }
    }
  }

  public async cargarData() {
    if (!this.idDetalle) return;

    this.itemDetalles = null;

    //Consumo de endpoint

    this.itemDetalles = await this.businessService.methodGet<
      PagosDetallesResponse,
      {}
    >(
      {
        url: ENDPOINTS.pagos.consulta.verDetalle,
        params: [this.idDetalle.toString()],
      },
      {}
    );
    try {
      this.detraccionResult = Math.round(this.itemDetalles.montoTotal * 0.1);

      this.infoDetraccion = await this.businessService.methodPost<
        DetraccionComprobantesResponse,
        {}
      >(
        {
          url: ENDPOINTS.comprobantes.consulta.detraccion,
          params: [],
        },
        {
          ids: this.itemDetalles.idSirEquivalente,
        }
      );
    } catch (error) {
      try {
        this.infoDetraccion.infoDetraccionInterface;
      } catch (error) {
        console.log('Se requiere equivalencia en el módulo catálogo');
      }
      if (error instanceof HttpResponseBase) {
        if (
          this.itemDetalles.clienteTipoDocumento === 'RUC' &&
          this.itemDetalles.montoTotal > 700
        ) {
          this.notificationService.warning(
            '¡ATENCIÓN!',
            (error as HttpErrorResponse).error.message +
              ', se requiere crear equivalencia en el módulo catálogo'
          );
        }
      }
    }
  }

  override getTopPosition(): number {
    return 0;
  }
  override onSucessCall(response: ResponseAPI<{}>): void {
    this.notificationService.success('¡BIEN!', response.message);
    this.cerrarModal();
    this.listarPagosHandler.refrescarData();
  }
  override inicializarFormWrapperYData(): void {
    this.formWrapper = new ComprobanteCrearForm();
    this.data = {};
  }
  override onErrorCall(): void {
    console.log('Algo salió mal...');
  }
}
