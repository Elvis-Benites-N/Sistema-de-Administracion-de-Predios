export interface ItemPredioListadoInterface {
  id: number;
  idItemInforgest: number;
  idItemSir: number;
  itemSir: {
    id: number;
    itemNombre: string;
  };
  itemInforgest: {
    id: number;
    nombre: string;
    codigo: string;
  };
}
