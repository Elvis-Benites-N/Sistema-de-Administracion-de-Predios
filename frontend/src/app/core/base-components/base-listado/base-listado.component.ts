import { Component, Inject, Injector } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { URLParam } from '../../controllers/services/api/api.service';
import { BusinessService } from '../../controllers/services/business/business.service';
import { IntBooleanoEnum } from '../../enums/int-booleano.enum';
import { TipoVistaListado } from '../../enums/tipo-vista-listado.enum';
import { PaginacionResponse } from '../../interfaces/paginacion-response.interface';

interface DataPagination {
  limit?: number;
  offset?: number;
  esPaginado?: IntBooleanoEnum;
}

interface IBaseListadoComponent<
  IForm extends {
    [K in keyof IForm]: AbstractControl<any>;
  }
> {
  endpoint: string | URLParam;
  formulario: FormGroup<IForm>;
  tipoVistaListado?: TipoVistaListado;
  esPaginado?: IntBooleanoEnum;
}

@Component({
  selector: 'base-listado',
  standalone: true,
  template: ``,
  styles: [],
})
export abstract class BaseListadoComponent<
  IResponse,
  IQuery,
  IForm extends {
    [K in keyof IForm]: AbstractControl<any>;
  }
> {
  private businessService: BusinessService;
  private endpoint: string | URLParam;

  protected readonly TipoVistaListadoType = TipoVistaListado;
  protected paginacionResponse: PaginacionResponse<IResponse>;
  protected response: IResponse[];
  protected formulario: FormGroup<IForm>;
  protected dataPagination: DataPagination;
  protected tipoVistaListado: TipoVistaListado;

  constructor(
    private readonly injector: Injector,
    @Inject(String)
    data: IBaseListadoComponent<IForm>
  ) {
    this.businessService = this.injector.get(BusinessService);
    this.endpoint = data.endpoint;
    this.formulario = data.formulario;
    this.dataPagination = {
      limit: 4,
      offset: 0,
      esPaginado: data.esPaginado ?? IntBooleanoEnum.True,
    };
    this.tipoVistaListado = data.tipoVistaListado ?? TipoVistaListado.Tabla;
  }

  protected actualizarEndpoint(endpoint: string | URLParam): void {
    this.endpoint = endpoint;
  }

  protected async cargarData() {
    if (this.dataPagination.esPaginado === IntBooleanoEnum.True) {
      this.paginacionResponse = null;

      this.paginacionResponse = await this.businessService.methodGet<
        PaginacionResponse<IResponse>,
        IQuery
      >(this.endpoint, this.toRequest());
    } else {
      this.response = null;

      this.response = await this.businessService.methodGet<IResponse[], IQuery>(
        this.endpoint,
        this.toRequest()
      );
    }
  }

  cambiarPagina(pagina: number): void {
    this.dataPagination.offset = (pagina - 1) * this.dataPagination.limit;
    this.cargarData();
  }

  cambiarTamanio(size: number): void {
    this.dataPagination.limit = size;
    this.dataPagination.offset = 0;
    this.cargarData();
  }

  abstract toRequest(): IQuery;
}
