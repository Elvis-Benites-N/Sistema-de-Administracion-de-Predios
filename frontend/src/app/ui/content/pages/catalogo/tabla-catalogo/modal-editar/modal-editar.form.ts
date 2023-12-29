import { FormControl, FormGroup } from '@angular/forms';
import { FormWrapper } from 'src/app/core/classes/form-wrapper.class';
import { CatalogoEditarRequest } from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';
import { CatalogoDetallesResponse } from 'src/app/core/controllers/services/business/dto/catalogo/catalogoDetalles.dto';
import { DateUtil } from 'src/app/core/utils/date.util';

export class CatalogoEditarForm extends FormWrapper<
  CatalogoEditarRequest,
  {
    id: FormControl<number>;
    fechaExpiracion: FormControl<Date>;
    fechaInicio: FormControl<Date>;
    nombreInforgest: FormControl<string>;
    nombreSir: FormControl<string>;
  }
> {
  constructor() {
    super();
  }
  public async toRequest(): Promise<CatalogoEditarRequest> {
    const formValue = this.formulario.getRawValue();

    return {
      id: formValue.id,
      fechaExpiracion: DateUtil.construirFormatDDMMYYYY(
        formValue.fechaExpiracion
      ),
    };
  }

  setDataOnForm(data: CatalogoDetallesResponse) {
    this.formulario.patchValue({
      id: data.id,
      fechaExpiracion: DateUtil.fromStringToDate(data.fechaExpiracion),
      fechaInicio: DateUtil.fromStringToDate(data.fechaInicio),
      nombreInforgest: data.itemInforgest.nombre,
      nombreSir: data.itemSir.itemNombre,
    });
  }

  protected inicializarFormulario(): void {
    this.formulario = new FormGroup({
      id: new FormControl(null),
      fechaExpiracion: new FormControl(null),
      fechaInicio: new FormControl(null),
      nombreInforgest: new FormControl({ value: null, disabled: true }),
      nombreSir: new FormControl({ value: null, disabled: true }),
    });
  }
  protected extraValidation(): boolean {
    return true;
  }

  protected override deshabilitarCampos(): void {}
}
