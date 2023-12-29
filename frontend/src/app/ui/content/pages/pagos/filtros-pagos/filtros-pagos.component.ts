import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFiltroComponent } from 'src/app/core/base-components/base-filtro/base-filtro.component';
import {
  PagosFiltro,
  PagosQuery,
  PagosResponse,
} from 'src/app/core/controllers/services/business/dto/pagos/pagos.dto';
import { EstadoPagos } from 'src/app/core/enums/estadoPagos.enum';

@Component({
  selector: 'filtros-pagos',
  templateUrl: './filtros-pagos.component.html',
  styleUrls: ['./filtros-pagos.component.scss'],
})
export class FiltrosPagosComponent
  extends BaseFiltroComponent<PagosResponse, PagosQuery>
  implements OnInit
{
  @Input()
  formulario: FormGroup<PagosFiltro>;

  @Output()
  filtroItems: EventEmitter<any>;

  fechasSub: Subscription;
  estadosPagosType: EstadoPagos;

  constructor(injector: Injector) {
    super(injector, {});
    this.filtroItems = new EventEmitter();
  }

  override toRequest(): PagosQuery {
    return {};
  }

  ngOnInit(): void {
    this.iniciarEstado();
    this.fechasSub = this.formulario.controls.fechas.valueChanges.subscribe(
      (fechas) => {
        this.formulario.patchValue({
          fechaInicial: !fechas || fechas.length === 0 ? null : fechas[0],
          fechaFinal: !fechas || fechas.length === 0 ? null : fechas[1],
        });
        this.filtroItems.emit();
      }
    );
  }

  iniciarEstado() {
    this.formulario;
  }

  buscar() {
    this.filtroItems.emit();
  }

  resetearFiltros() {
    this.formulario.patchValue(
      {
        palabraClave: null,
        estados: null,
        fechaFinal: null,
        fechaInicial: null,
        fechas: null,
      },
      { emitEvent: false }
    );

    this.filtroItems.emit();
  }
  ngOnDestroy(): void {
    this.fechasSub?.unsubscribe();
  }
}
