import { FormControl, FormGroup } from '@angular/forms';
import { FormWrapper } from 'src/app/core/classes/form-wrapper.class';
import { ComprobanteCrearRequest } from 'src/app/core/controllers/services/business/dto/comprobantes/comprobantes.dto';

export class ComprobanteCrearForm extends FormWrapper<
  ComprobanteCrearRequest,
  {
    //CABECERA
    idPago: FormControl<number>;
  }
> {
  constructor() {
    super();
  }
  public async toRequest(): Promise<ComprobanteCrearRequest> {
    const formValue = this.formulario.getRawValue();

    return {
      idPago: formValue.idPago,
    };
  }
  protected inicializarFormulario(): void {
    this.formulario = new FormGroup({
      idPago: new FormControl(null),
    });
  }
  protected extraValidation(): boolean {
    return true;
  }
  protected deshabilitarCampos(): void {}
}
