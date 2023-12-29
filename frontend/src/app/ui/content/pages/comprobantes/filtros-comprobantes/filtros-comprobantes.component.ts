import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFiltroComponent } from 'src/app/core/base-components/base-filtro/base-filtro.component';
import {
  ComprobanteResponse,
  ComprobantesFiltro,
  ComprobantesQuery,
} from 'src/app/core/controllers/services/business/dto/comprobantes/comprobantes.dto';
import { TipoBusquedaEnum } from 'src/app/core/enums/tipoBusqueda.enum';

@Component({
  selector: 'filtros-comprobantes',
  templateUrl: './filtros-comprobantes.component.html',
  styleUrls: ['./filtros-comprobantes.component.scss'],
})
export class FiltrosComprobantesComponent
  extends BaseFiltroComponent<ComprobanteResponse, ComprobantesQuery>
  implements OnInit
{
  @Input()
  formulario: FormGroup<ComprobantesFiltro>;

  @Output()
  filtroItems: EventEmitter<any>;

  fechasSub: Subscription;
  tipoBusquedaSub: Subscription;

  public tipoBusquedaType = TipoBusquedaEnum;
  public tipoBusquedaEnum: TipoBusquedaEnum;

  constructor(injector: Injector, private cd: ChangeDetectorRef) {
    super(injector, {});
    this.filtroItems = new EventEmitter();
  }

  override toRequest(): ComprobantesQuery {
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
    this.tipoBusquedaSub =
      this.formulario.controls.tipoBusqueda.valueChanges.subscribe((value) => {
        if (value === this.tipoBusquedaType.numero) {
          this.tipoBusquedaEnum = this.tipoBusquedaType.numero;
          this.resetearFiltros();
        }
        if (value === this.tipoBusquedaType.cliente) {
          this.tipoBusquedaEnum = this.tipoBusquedaType.cliente;
          this.resetearFiltros();
        }
      });
    this.formulario.patchValue({
      tipoBusqueda: this.tipoBusquedaType.cliente,
    });
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
        fechaFinal: null,
        fechaInicial: null,
        fechas: null,
        palabraClave: null,
      },
      { emitEvent: false }
    );

    this.filtroItems.emit();
  }
  ngOnDestroy(): void {
    this.fechasSub?.unsubscribe();
    this.tipoBusquedaSub?.unsubscribe();
  }
}
