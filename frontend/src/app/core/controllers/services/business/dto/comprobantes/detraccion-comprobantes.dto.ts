export interface DetraccionComprobantesResponse {
  esDetraccionValida: boolean;
  mensaje: string;
  infoDetraccionInterface: {
    detraccionId: number;
    detraccionCodigo: string;
    detraccionDescripcion: string;
    detraccionPorcentaje: number;
    detraccionTipoOperacion: string;
  };
}

export interface DetraccionCalcularRequest {
  ids: number[];
}
