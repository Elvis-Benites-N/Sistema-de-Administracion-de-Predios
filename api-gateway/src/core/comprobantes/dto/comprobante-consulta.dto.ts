import {
  IsOptional,
  Validate,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IntBooleanoEnum } from 'src/common/enums/int-booleano.enum';
import { OrdenamientoEnum } from 'src/common/enums/ordenamiento.enum';
import { FechaFiltro } from 'src/common/validators/fecha.validator';

export enum AtributoOrdenamientoComprobanteConsulta {
  ID,
  FechaEmision,
  Estado,
  Serie,
  Numero,
  Cliente,
}

export class ComprobanteQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly tipoComprobanteId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly establecimientoId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly estadoId?: number;

  @IsOptional()
  @Validate(FechaFiltro)
  readonly fechaInicial?: string;

  @IsOptional()
  @Validate(FechaFiltro)
  readonly fechaFinal?: string;

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
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  readonly numero?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly cliente?: string;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoComprobanteConsulta)
  readonly atributoOrdenamiento?: AtributoOrdenamientoComprobanteConsulta =
    AtributoOrdenamientoComprobanteConsulta.ID;

  // Para usar localmente
  fechaInicialDate?: Date;
  fechaFinalDate?: Date;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
