import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { IntBooleanoEnum, OrdenamientoEnum } from '@Enums';

export enum AtributoOrdenamientoItemEquivalenciaConsulta {
  ID,
  codigo,
  nombre,
}

export class ItemsEquivalenciaListadoQuery {
  @IsOptional()
  @IsString()
  palabraClave?: string;

  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(50)
  readonly limit?: number = 3;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly offset?: number = 0;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  readonly esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoItemEquivalenciaConsulta)
  readonly atributoOrdenamiento?: AtributoOrdenamientoItemEquivalenciaConsulta =
    AtributoOrdenamientoItemEquivalenciaConsulta.ID;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
