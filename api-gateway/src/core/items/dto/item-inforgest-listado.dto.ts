import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { IntBooleanoEnum, OrdenamientoEnum } from '@Enums';

export enum AtributoOrdenamientoItemInforgestConsulta {
  ID,
  nombre,
  codigo,
}
export class ItemInforgestListadoQuery {
  /**
   * @example 4505.01049902
   */
  @IsOptional()
  @IsString()
  codigo?: string;

  /**
   * @example MORAS
   */
  @IsOptional()
  @IsString()
  nombre?: string;

  /**
   * @example 3
   */
  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(50)
  readonly limit?: number = 3;

  /**
   * @example 0
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly offset?: number = 0;

  /**
   * @example 0
   */
  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  readonly esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  /**
   * @example "DESC"
   */
  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  /**
   * @example 0
   */
  @IsOptional()
  @IsEnum(AtributoOrdenamientoItemInforgestConsulta)
  readonly atributoOrdenamiento?: AtributoOrdenamientoItemInforgestConsulta =
    AtributoOrdenamientoItemInforgestConsulta.ID;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
