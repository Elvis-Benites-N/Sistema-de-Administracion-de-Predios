export interface ListarComprobanteInterface {
  readonly id: number;
  readonly idPagoInforgest: number;
  readonly serie: string;
  readonly numero: string;
  readonly clienteNombre: string;
  readonly clienteNumeroDocumento: string;
  readonly clienteTipoDocumento: string;
  readonly fechaCreacion: Date;
  readonly fechaEmision: Date;
  readonly idEstadoComprobante: number;
  readonly monto: number;
  readonly estadoComprobante: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  readonly tipoComprobante: {
    id: number;
    nombre: string;
  };
}
