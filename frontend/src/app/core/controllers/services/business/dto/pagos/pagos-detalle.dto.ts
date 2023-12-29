export interface PagosDetallesResponse {
  id: number;
  codigoPago: string;
  fechaPago: Date;
  clienteNombre: string;
  clienteNumeroDocumento: string;
  clienteTipoDocumento: string;
  clienteDireccion: string;
  clienteEmail: string;
  montoTotal: number;
  monedaId: number;
  monedaNombre: string;
  monedaSimbolo: string;
  itemActivoTipo: string;
  itemActivoCodigo: string;
  itemActivoNombre: string;
  contrato: string;
  pagosInforgestDetalleInterface: [
    {
      itemFincasNombre: string;
      itemMonto: number;
      idDb: number;
    }
  ];
  comprobante: {
    serie: string;
    numero: number;
    fechaEmision: Date;
    fechaCreacion: Date;
    estadoComprobante: String;
  };

  idSirEquivalente: number[];
}
