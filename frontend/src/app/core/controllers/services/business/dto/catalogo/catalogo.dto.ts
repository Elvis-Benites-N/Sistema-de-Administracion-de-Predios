import { FormControl } from '@angular/forms';
import { IntBooleanoEnum } from 'src/app/core/enums/int-booleano.enum';

export interface CatalogoResponse {
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

export interface CatalogoQuery {
  readonly limit?: number;
  readonly offset?: number;
  readonly esPaginado?: IntBooleanoEnum;
  readonly palabraClave?: string;
}

export interface CatalogoFiltro {
  palabraClave: FormControl<string>;
}

export interface CatalogoEditarRequest {
  id: number;
  fechaExpiracion: string;
}
