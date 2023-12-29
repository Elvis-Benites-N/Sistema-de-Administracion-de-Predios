import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFiltroComponent } from 'src/app/core/base-components/base-filtro/base-filtro.component';
import {
  CatalogoFiltro,
  CatalogoQuery,
  CatalogoResponse,
} from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';

@Component({
  selector: 'app-filtros-catalogo',
  templateUrl: './filtros-catalogo.component.html',
  styleUrls: ['./filtros-catalogo.component.scss'],
})
export class FiltrosCatalogoComponent
  extends BaseFiltroComponent<CatalogoResponse, CatalogoQuery>
  implements OnInit
{
  @Input()
  formulario: FormGroup<CatalogoFiltro>;

  @Output()
  filtroItems: EventEmitter<any>;

  idEquivalencia: number;
  constructor(injector: Injector) {
    super(injector, {});
    this.filtroItems = new EventEmitter();
    this.mostrarModalCrear = false;
  }

  override toRequest(): CatalogoQuery {
    return {};
  }

  ngOnInit(): void {}

  public mostrarModalCrear: boolean;

  public mostrarModalCrearRelacion() {
    this.mostrarModalCrear = true;
  }

  public cerrarModalCrearRelacion = () => {
    this.mostrarModalCrear = false;
  };

  buscar() {
    this.filtroItems.emit();
  }

  resetearFiltros() {
    this.formulario.patchValue(
      {
        palabraClave: null,
      },
      { emitEvent: false }
    );
    this.filtroItems.emit();
  }
}
