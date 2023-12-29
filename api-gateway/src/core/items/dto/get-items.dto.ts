import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  IntBooleanoEnum,
  OrdenamientoEnum,
  TipoEstadoItemEnum,
  TipoFiltroUnidepEnum,
  TipoDeItemEnum,
} from '@Enums';

export enum AtributoOrdenamientoItemsEnum {
  Descripcion,
  FechaRegistro,
  Precio,
}

export class CatalogoItemsQuery {
  @IsOptional()
  @IsNotEmpty()
  unidepCodigo?: string;

  @IsOptional()
  @IsEnum(TipoFiltroUnidepEnum)
  tipoDeFiltroUnidep?: TipoFiltroUnidepEnum = TipoFiltroUnidepEnum.UnidepEHijos;

  @IsOptional()
  @IsEnum(TipoDeItemEnum)
  tipoDeItem?: TipoDeItemEnum;

  @IsOptional()
  @IsEnum(TipoEstadoItemEnum)
  estado?: TipoEstadoItemEnum = TipoEstadoItemEnum.Activo;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoria?: number;

  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(50)
  limit?: number = 3;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Ascendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoItemsEnum)
  atributoOrdenamiento?: AtributoOrdenamientoItemsEnum =
    AtributoOrdenamientoItemsEnum.Descripcion;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  palabraClave?: string;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
