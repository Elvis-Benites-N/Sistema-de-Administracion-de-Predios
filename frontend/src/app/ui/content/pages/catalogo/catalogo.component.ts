import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseListadoComponent } from 'src/app/core/base-components/base-listado/base-listado.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import {
  CatalogoFiltro,
  CatalogoQuery,
  CatalogoResponse,
} from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';
import { CardContentCatalogo } from 'src/app/core/interfaces/card-content-catalogo.interface';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';
import { ListarEquivalenciasHandler } from './catalogo.handler';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent
  extends BaseListadoComponent<CatalogoResponse, CatalogoQuery, CatalogoFiltro>
  implements OnInit
{
  columnasContenido: PaginacionResponse<CardContentCatalogo>;

  constructor(
    injector: Injector,
    private listarEquivalenciasHandler: ListarEquivalenciasHandler
  ) {
    super(injector, {
      endpoint: ENDPOINTS.catalogo.consulta.listado,
      formulario: new FormGroup({
        palabraClave: new FormControl<string>(null),
      }),
    });
  }

  ngOnInit(): void {
    this.cargarData();

    this.listarEquivalenciasHandler.escuchar().subscribe(() => {
      this.refrescarData();
    });
  }

  refrescarData = () => {
    this.cargarData();
  };

  toRequest(): CatalogoQuery {
    const formValue = this.formulario.getRawValue();

    return {
      limit: this.dataPagination.limit,
      offset: this.dataPagination.offset,
      esPaginado: this.dataPagination.esPaginado,
      palabraClave: formValue.palabraClave,
    };
  }
}
