export interface CatalogoDetallesResponse {
  id: number;
  idItemInforgest: number;
  idItemSir: number;
  fechaInicio: string;
  fechaExpiracion: string;
  esVigente: boolean;
  tieneComprobantes: boolean;
  itemSir: {
    id: number;
    tipoItemId: number;
    tipoItemDescripcion: string;
    monedaSimbolo: string;
    monedaNombre: string;
    categoriaId: number;
    categoriaNombre: string;
    categoriaDescripcion: string;
    itemNombre: string;
    itemIgv: number;
    itemValorUnitario: number;
    itemPrecio: number;
    tipoAfectacionDescripcion: string;
    unidepDescripcion: string;
    idMs: number;
  };
  itemInforgest: {
    id: number;
    nombre: string;
    codigo: string;
    idDb: number;
  };
}
