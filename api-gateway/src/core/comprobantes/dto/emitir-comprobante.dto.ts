import { ApiHideProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, Min } from 'class-validator';
import { UsuarioModel } from 'src/common/auth/usuario.model';

export class EmitirComprobanteRequest {
  /**
   * @example 25022
   */
  @IsInt()
  @IsDefined()
  @Min(1)
  idPago: number;

  @ApiHideProperty()
  usuario: UsuarioModel;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
