export interface ComprobanteDetallesResponse {
  id: number;
  tieneNotaCredito: boolean;
  tieneNotaDebito: boolean;
  idTipoComprobante: number;
  idMoneda: number;
  idEstado: number;
  idEstablecimiento: number;
  serie: string;
  numero: string;
  fechaCreacion: string;
  fechaEmision: string;
  importeOperacionGravada: number;
  importeOperacionExonerada: number;
  importeOperacionInafecta: number;
  importeIgv: number;
  importeIcbp: number;
  importeTotal: number;
  importeTotalLetras: string;
  qr: string;
  observacion: string;
  tasaCambioCompra: number;
  tasaCambioVenta: number;
  publicKey: string;
  descuentoTotalBi: number;
  descuentoTotalIgv: number;
  tipoComprobante: {
    nombre: string;
    eqSunat: string;
  };
  moneda: {
    descripcion: string;
    simbolo: string;
    estado: boolean;
    eqSunat: boolean;
  };
  estado: {
    nombre: string;
    descripcion: string;
  };
  comprobanteBoleta: {
    nombres: string;
    apellidos: string;
    idTipoDocumento: number;
    numeroDocumento: string;
    direccion: string;
    codigoMatricula: string;
    tipoDocumento: {
      descripcion: string;
    };
  };
  itemsComprobante: [
    {
      id: number;
      cantidad: number;
      item: {
        id: number;
        descripcion: string;
        tipoAfectacionId: number;
        tipoAfectacionNombre: string;
        valorUnitario: number;
        igvOriginal: number;
        igv: number;
        precioOriginal: number;
        precio: number;
        unidadMedidaCodigo: string;
        unidadMedidaDescripcion: string;
        detraccionId: number;
        detraccionCodigo: string;
        detraccionDescripcion: string;
        detraccionPorcentaje: number;
        idMs: number;
        idMoneda: number;
        descuentoBi: number;
        descuentoIgv: number;
      };
    }
  ];
  comprobantes: [
    {
      id: number;
      idComprobante: number;
      idTipoComprobante: number;
      idEstado: number;
      serie: string;
      numero: string;
      fechaCreacion: string;
      fechaEmision: string;
      importeOperacionGravada: number;
      importeOperacionExonerada: number;
      importeOperacionInafecta: number;
      importeIgv: number;
      importeIcbp: number;
      importeTotal: number;
      importeTotalLetras: string;
      qr: string;
      observacion: string;
      tasaCambioCompra: number;
      tasaCambioVenta: number;
      comprobanteNotaCredito: {
        idTipoNotaCredito: number;
        sustento: string;
        tipoNotaCredito: {
          descripcion: string;
        };
      };
    }
  ];
}
