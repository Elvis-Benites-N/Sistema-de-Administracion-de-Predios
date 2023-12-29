import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FechaUtil } from '@Utils';

@ValidatorConstraint({ name: 'fechaFiltro', async: false })
export class FechaFiltro implements ValidatorConstraintInterface {
  validate(text: string) {
    return FechaUtil.fechaFiltro(text);
  }

  defaultMessage() {
    return 'La fecha debe ser formato DD-MM-YYYY y el año estar entre 2020 y 2025';
  }
}
