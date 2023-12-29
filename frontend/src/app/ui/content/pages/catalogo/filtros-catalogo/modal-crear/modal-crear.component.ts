import {
  Component,
  Injector,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseCreacionComponent } from 'src/app/core/base-components/base-creacion/base-creacion.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { DetallesItemSIR } from 'src/app/core/controllers/services/business/dto/catalogo/detallesSIR.dto';
import {
  InforgestItem,
  SirItem,
} from 'src/app/core/controllers/services/business/dto/catalogo/items.dto';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { ListarEquivalenciasHandler } from '../../catalogo.handler';
import {
  CearItemCatalogoRequest,
  FormularioCatalogo,
} from './modal-crear.form';

interface IData {
  sirItems?: SirItem[];
  inforgestItems?: InforgestItem[];
}

@Component({
  selector: 'modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.scss'],
})
export class ModalCrearComponent
  extends BaseCreacionComponent<
    IData,
    FormularioCatalogo,
    CearItemCatalogoRequest,
    ResponseAPI
  >
  implements OnInit
{
  @Input()
  isModalVisible: boolean;

  @Input()
  cerrarModal: Function;

  @Input()
  idEquivalencia: number;

  fechasSub: Subscription;
  selectedInforgestId: number;
  detailsItemSIRSub: Subscription;
  detallesSIR: DetallesItemSIR;
  defaultDate = new Date('02-05-2023');

  constructor(
    injector: Injector,
    private listarEquivalenciasHandler: ListarEquivalenciasHandler
  ) {
    super(injector, ENDPOINTS.catalogo.consulta.crearEquivalencia);
  }
  ngOnInit(): void {
    this.detailsItemSIRSub =
      this.formWrapper.formulario.controls.idItemSir.valueChanges.subscribe(
        (value) => {
          this.cargarDataDetallesSIR(value);
        }
      );
  }

  async cargarDataDetallesSIR(value: number) {
    if (this.formWrapper.formulario.controls.idItemSir.value !== null) {
      this.detallesSIR = await this.businessService.methodGet<
        DetallesItemSIR,
        {}
      >({
        url: ENDPOINTS.catalogo.consulta.detallesSIR,
        params: [value.toString()],
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible']) {
      if (changes['isModalVisible'].currentValue === true) {
        this.cargarData();
        this.fechasSub =
          this.formWrapper.formulario.controls.fechas.valueChanges.subscribe(
            (fechas) => {
              this.formWrapper.formulario.patchValue({
                fechaInicio: !fechas || fechas.length === 0 ? null : fechas[0],
                fechaExpiracion:
                  !fechas || fechas.length === 0 ? null : fechas[1],
              });
            }
          );
      } else {
        this.formWrapper.resetear();
      }
    }
  }

  override async cargarData(): Promise<void> {
    const promisesResponse = await Promise.allSettled([
      this.businessService.methodGet<SirItem[], {}>(
        ENDPOINTS.catalogo.consulta.sirItems
      ),
      this.businessService.methodGet<SirItem[], {}>(
        ENDPOINTS.catalogo.consulta.inforgestItems
      ),
    ]);
    if (promisesResponse[0].status === 'fulfilled') {
      this.data.sirItems = promisesResponse[0].value;
    }

    if (promisesResponse[1].status === 'fulfilled') {
      this.data.inforgestItems = promisesResponse[1].value;
    }
  }

  override getTopPosition(): number {
    return 0;
  }
  override onSucessCall(response: ResponseAPI<{}>): void {
    this.cerrarModal();
    this.notificationService.success('¡BIEN!', response.message);
    this.formWrapper.resetear();
    this.listarEquivalenciasHandler.refrescarData();
  }
  override inicializarFormWrapperYData(): void {
    this.data = {};
    this.formWrapper = new FormularioCatalogo();
  }
  override onErrorCall(): void {
    console.log('Error');
  }

  ngOnDestroy(): void {
    this.fechasSub?.unsubscribe();
    this.detailsItemSIRSub?.unsubscribe();
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return current.getTime() < today.getTime();
  };
}
