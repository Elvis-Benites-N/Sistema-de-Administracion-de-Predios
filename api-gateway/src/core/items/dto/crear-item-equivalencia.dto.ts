import { UsuarioModel } from '@/common/auth/usuario.model';
import { FechaFiltro } from '@/common/validators';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, Min, Validate } from 'class-validator';

export class CrearItemRequest {
  /**
   * @example 1
   */
  @IsDefined()
  @IsInt()
  @Min(1)
  idItemSir: number;

  /**
   * @example 3147
   */
  @IsDefined()
  @IsInt()
  @Min(1)
  idItemInforgest: number;

  @IsOptional()
  @Validate(FechaFiltro)
  fechaInicio: string;

  @IsOptional()
  @Validate(FechaFiltro)
  fechaExpiracion: string;

  @ApiHideProperty()
  usuario: UsuarioModel;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
