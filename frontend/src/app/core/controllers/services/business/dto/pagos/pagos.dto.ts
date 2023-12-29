import { FormControl } from '@angular/forms';
import { IntBooleanoEnum } from 'src/app/core/enums/int-booleano.enum';

export interface PagosResponse {
  id: number;
  codigoPago: string;
  fechaPago: Date;
  clienteNombre: string;
  clienteNumeroDocumento: string;
  clienteTipoDocumento: string;
  fechaComprobante?: Date;
  estadoComprobante?: string;
}

export interface PagosQuery {
  readonly limit?: number;
  readonly offset?: number;
  readonly esPaginado?: IntBooleanoEnum;
  readonly palabraClave?: string;
  readonly fechaInicial?: string;
  readonly fechaFinal?: string;
  readonly estados?: string;
}

export interface PagosFiltro {
  palabraClave: FormControl<string>;
  fechaInicial: FormControl<Date>;
  fechaFinal: FormControl<Date>;
  fechas: FormControl<Date[]>;
  estados: FormControl<string>;
}
