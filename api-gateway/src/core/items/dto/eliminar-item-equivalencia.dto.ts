import { UsuarioModel } from '@/common/auth/usuario.model';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, Min } from 'class-validator';

export class EliminarItemRequest {
  /**
   * @example 1
   */
  @IsDefined()
  @IsInt()
  @Min(1)
  id: number;

  @ApiHideProperty()
  usuario: UsuarioModel;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
