import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { CatalogoEditarRequest } from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';
import { CatalogoDetallesResponse } from 'src/app/core/controllers/services/business/dto/catalogo/catalogoDetalles.dto';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { ListarEquivalenciasHandler } from '../../catalogo.handler';
import { CatalogoEditarForm } from './modal-editar.form';

@Component({
  selector: 'modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss'],
})
export class ModalEditarComponent implements OnInit, OnChanges {
  @Input()
  isEditModalVisible: boolean;

  @Input()
  closeEditModal: Function;

  @Input()
  idEditable: number;

  itemDetails: CatalogoDetallesResponse;

  public formWrapper: CatalogoEditarForm;

  constructor(
    private readonly businessService: BusinessService,
    private message: NzNotificationService,
    private listarEquivalencias: ListarEquivalenciasHandler
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditModalVisible']) {
      if (changes['isEditModalVisible'].currentValue === true) {
        this.cargarData();
        this.inicializarFormWrapper();
      }
    }
  }

  public async cargarData() {
    if (!this.idEditable) return;

    this.itemDetails = null;

    //Consumo de endpoint

    this.itemDetails = await this.businessService.methodGet<
      CatalogoDetallesResponse,
      {}
    >(
      {
        url: ENDPOINTS.catalogo.consulta.verDetalle,
        params: [this.idEditable.toString()],
      },
      {}
    );
    if (this.itemDetails) {
      this.formWrapper.setDataOnForm(this.itemDetails);
    }
  }

  inicializarFormWrapper(): void {
    this.formWrapper = new CatalogoEditarForm();
  }

  async actualizarFechaDeExpiracion() {
    if (this.formWrapper.enviandoFormulario) return;

    if (!this.formWrapper.validate) return;

    try {
      this.formWrapper.deshabilitar();

      const response = await this.businessService.methodPatch<
        ResponseAPI,
        CatalogoEditarRequest
      >(
        ENDPOINTS.catalogo.consulta.editarEquivalencia,
        await this.formWrapper.toRequest()
      );
      this.onSucessCall(response);
    } catch (error) {
      this.formWrapper.hasErrorFromAPI = true;
      this.formWrapper.errorMessageFromAPI =
        ErrorUtil.getApiErrorMessage(error);
    } finally {
      this.formWrapper.habilitar();
    }
  }

  onSucessCall(response: ResponseAPI) {
    this.closeEditModal();
    this.listarEquivalencias.refrescarData();
    this.message.success(
      '¡FECHA ACTUALIZADA!',
      'Se actualizó la equivalencia correctamente'
    );
    this.formWrapper.resetear();
  }

  disabledDate = (current: Date): boolean => {
    return (
      current.getTime() <
      this.formWrapper.formulario.getRawValue().fechaInicio.getTime()
    );
  };
}
