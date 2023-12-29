export interface ItemEquivalenciaDetalleInterface {
  id: number;
  idItemInforgest: number;
  idItemSir: number;
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
  };
  itemInforgest: {
    id: number;
    nombre: string;
    codigo: string;
  };
}
