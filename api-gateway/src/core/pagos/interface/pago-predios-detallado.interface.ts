export interface PagoPrediosDetalladoInterface {
  id: number;
  codigoPago: string;
  fechaPago: Date;
  clienteNombre: string;
  clienteTipoDocumentoId: number;
  clienteNumeroDocumento: string;
  clienteDireccion: string;
  clienteEmail: string;
  montoTotal: number;
  monedaId: number;
  monedaSimbolo: string;
  monedaNombre: string;
  itemActivoTipo: string;
  itemActivoCodigo: string;
  itemActivoNombre: string;
  contrato: string;
  pagosInforgestDetalleInterface: PagosInforgestDetalleInterface[];
  comprobante?: ComprobanteInterface;
}

interface PagosInforgestDetalleInterface {
  itemFincasNombre: string;
}

interface ComprobanteInterface {
  serie: string;
  numero: string;
  fechaCreacion: Date;
  fechaEmision: Date;
  estadoComprobante: string;
}
