import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseListadoComponent } from 'src/app/core/base-components/base-listado/base-listado.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';

import {
  PagosFiltro,
  PagosQuery,
  PagosResponse,
} from 'src/app/core/controllers/services/business/dto/pagos/pagos.dto';
import { DateUtil } from 'src/app/core/utils/date.util';
import { ListarPagosHandler } from './pagos.handler';

@Component({
  selector: 'pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent
  extends BaseListadoComponent<PagosResponse, PagosQuery, PagosFiltro>
  implements OnInit
{
  constructor(
    injector: Injector,
    private listarPagosHandler: ListarPagosHandler
  ) {
    super(injector, {
      endpoint: ENDPOINTS.pagos.consulta.listado,
      formulario: new FormGroup({
        palabraClave: new FormControl<string>(null),
        fechaInicial: new FormControl<Date>(null),
        fechaFinal: new FormControl<Date>(null),
        fechas: new FormControl<Date[]>(null),
        estados: new FormControl<string>(null),
      }),
    });
  }

  ngOnInit(): void {
    this.cargarData();

    this.listarPagosHandler.escuchar().subscribe(() => {
      this.refrescarData();
    });
  }
  refrescarData() {
    this.cargarData();
  }

  toRequest(): PagosQuery {
    const formValue = this.formulario.getRawValue();

    return {
      limit: this.dataPagination.limit,
      offset: this.dataPagination.offset,
      esPaginado: this.dataPagination.esPaginado,
      palabraClave: formValue.palabraClave,
      fechaInicial: DateUtil.construirFormatDDMMYYYY(formValue.fechaInicial),
      fechaFinal: DateUtil.construirFormatDDMMYYYY(formValue.fechaFinal),
      estados: formValue.estados,
    };
  }
}
