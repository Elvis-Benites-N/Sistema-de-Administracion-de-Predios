import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseListadoComponent } from 'src/app/core/base-components/base-listado/base-listado.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import {
  ComprobanteResponse,
  ComprobantesFiltro,
  ComprobantesQuery,
} from 'src/app/core/controllers/services/business/dto/comprobantes/comprobantes.dto';
import { TipoBusquedaEnum } from 'src/app/core/enums/tipoBusqueda.enum';
import { cardContentComprobante } from 'src/app/core/interfaces/card-content-comprobante.interface';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';
import { DateUtil } from 'src/app/core/utils/date.util';

@Component({
  selector: 'comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.scss'],
})
export class ComprobantesComponent
  extends BaseListadoComponent<
    ComprobanteResponse,
    ComprobantesQuery,
    ComprobantesFiltro
  >
  implements OnInit
{
  public tipoBusquedaType = TipoBusquedaEnum;
  public tipoBusquedaEnum: TipoBusquedaEnum;
  columnasContenido: PaginacionResponse<cardContentComprobante>;

  constructor(injector: Injector) {
    super(injector, {
      endpoint: ENDPOINTS.comprobantes.consulta.listado,
      formulario: new FormGroup({
        tipoBusqueda: new FormControl<number>(null),
        fechaInicial: new FormControl<Date>(null),
        fechaFinal: new FormControl<Date>(null),
        fechas: new FormControl<Date[]>(null),
        palabraClave: new FormControl<string>(null),
      }),
    });
  }

  ngOnInit(): void {
    this.cargarData();
    // tipo.onchange(valor=> {

    //   this.formulario.controls.numero.disable();
    //   this.formulario.controls.numero.enable();
    // })
  }

  toRequest(): ComprobantesQuery {
    const formValue = this.formulario.getRawValue();

    return {
      limit: this.dataPagination.limit,
      offset: this.dataPagination.offset,
      esPaginado: this.dataPagination.esPaginado,
      numero:
        this.formulario.getRawValue().tipoBusqueda ==
        this.tipoBusquedaType.numero
          ? formValue.palabraClave
          : null,
      cliente:
        this.formulario.getRawValue().tipoBusqueda ==
        this.tipoBusquedaType.cliente
          ? formValue.palabraClave
          : null,
      fechaInicial: DateUtil.construirFormatDDMMYYYY(formValue.fechaInicial),
      fechaFinal: DateUtil.construirFormatDDMMYYYY(formValue.fechaFinal),
    };
  }
}
