import { FechaFiltro } from '@Validators';
import { IsDefined, IsInt, Min, Validate } from 'class-validator';

export class ActualizarFechaExpiracionDto {
  @IsDefined()
  @IsInt()
  @Min(1)
  id: number;

  @IsDefined()
  @Validate(FechaFiltro)
  fechaExpiracion: string;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
