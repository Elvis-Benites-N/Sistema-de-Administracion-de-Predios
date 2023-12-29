import { FormControl, FormGroup } from '@angular/forms';
import { FormWrapper } from 'src/app/core/classes/form-wrapper.class';
import { DateUtil } from 'src/app/core/utils/date.util';

export interface CearItemCatalogoRequest {
  fechaInicio: string;
  fechaExpiracion: string;
  idItemSir: number;
  idItemInforgest: number;
}

export class FormularioCatalogo extends FormWrapper<
  CearItemCatalogoRequest,
  {
    fechaInicio: FormControl<Date>;
    fechaExpiracion: FormControl<Date>;
    idItemSir: FormControl<number>;
    idItemInforgest: FormControl<number>;
    fechas: FormControl<Date[]>;
  }
> {
  constructor() {
    super();
  }

  public async toRequest(): Promise<CearItemCatalogoRequest> {
    const form = this.formulario.getRawValue();

    return {
      fechaInicio: DateUtil.construirFormatDDMMYYYY(form.fechaInicio),
      fechaExpiracion: DateUtil.construirFormatDDMMYYYY(form.fechaExpiracion),
      idItemSir: form.idItemSir,
      idItemInforgest: form.idItemInforgest,
    };
  }

  protected override inicializarFormulario(): void {
    this.formulario = new FormGroup({
      fechaInicio: new FormControl(null),
      fechaExpiracion: new FormControl(null),
      idItemInforgest: new FormControl(null),
      idItemSir: new FormControl(null),
      fechas: new FormControl(null),
    });
  }

  protected override extraValidation(): boolean {
    return true;
  }

  protected override deshabilitarCampos(): void {}
}
