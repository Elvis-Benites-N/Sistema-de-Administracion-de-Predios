import { Form, FormControl } from '@angular/forms';
import { IntBooleanoEnum } from 'src/app/core/enums/int-booleano.enum';

export interface ComprobanteResponse {
  id: number;
  publicKey: string;
  tipoComprobanteId: number;
  tipoComprobanteNombre: string;
  establecimientoId: number;
  establecimientoUnidadDescripcion: string;
  fechaEmision: Date;
  serie: string;
  numero: string;
  cliente: string;
  importeTotal: number;
  estadoId: number;
  estadoNombre: string;
  monedaId: number;
  monedaDescripcion: string;
  monedaSimbolo: string;
  tieneNotaCredito: boolean;
  tieneNotaDebito: boolean;
}

export interface ComprobantesQuery {
  readonly limit?: number;
  readonly offset?: number;
  readonly esPaginado?: IntBooleanoEnum;
  readonly fechaInicial?: string;
  readonly cliente?: string;
  readonly numero?: string;
  readonly fechaFinal?: string;
}

export interface ComprobantesFiltro {
  tipoBusqueda: FormControl<number>;
  fechaInicial: FormControl<Date>;
  fechaFinal: FormControl<Date>;
  fechas: FormControl<Date[]>;
  palabraClave: FormControl<string>;
}

export interface ComprobanteCrearRequest {
  idPago: number;
}
