export interface PagoPrediosListadoInterface {
  id: number;
  codigoPago: string;
  fechaPago: Date;
  montoTotal: number;
  clienteNombre: string;
  clienteTipoDocumentoId: number;
  clienteNumeroDocumento: string;
  clienteDireccion: string;
  clienteEmail: string;
  monedaId: number;
  monedaNombre: string;
  contrato: string;
  idPagoInforgset: number;
  itemFincasNombre: string;
  comprobanteFechaCreacion?: Date;
  comprobanteFechaEmision?: Date;
  comprobanteEstado?: string;
}
