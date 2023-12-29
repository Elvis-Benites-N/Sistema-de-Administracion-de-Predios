import {
  IsOptional,
  IsString,
  Min,
  IsInt,
  Max,
  IsEnum,
  Validate,
  Matches,
} from 'class-validator';
import {
  EstadoComprobantePrediosEnum,
  IntBooleanoEnum,
  OrdenamientoEnum,
} from '@Enums';
import { FechaFiltro } from '@Validators';

export enum AtributoOrdenamientoPagoInforgestConsulta {
  ID,
  cliente,
  codigo,
  contrato,
}

export class PagosInforgestListadoQuery {
  @IsOptional()
  @IsString()
  palabraClave?: string;

  @IsOptional()
  @IsString()
  contrato?: string;

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
  @IsEnum(EstadoComprobantePrediosEnum)
  @Min(1)
  estadoComprobanteOrden?: EstadoComprobantePrediosEnum =
    EstadoComprobantePrediosEnum.PENDIENTE;

  @IsOptional()
  @IsEnum(IntBooleanoEnum)
  readonly esPaginado?: IntBooleanoEnum = IntBooleanoEnum.True;

  @IsOptional()
  @IsEnum(OrdenamientoEnum)
  readonly ordenamiento?: OrdenamientoEnum = OrdenamientoEnum.Descendente;

  @IsOptional()
  @IsEnum(AtributoOrdenamientoPagoInforgestConsulta)
  readonly atributoOrdenamiento?: AtributoOrdenamientoPagoInforgestConsulta =
    AtributoOrdenamientoPagoInforgestConsulta.ID;

  // Para usar localmente
  fechaInicialDate?: Date;
  fechaFinalDate?: Date;

  /*FILTRO SÓLO APLICABLE A COMPROBANTES*/

  @IsOptional()
  @IsInt()
  @Min(1)
  idTipoComprobante?: number;

  @IsOptional()
  @Matches(/[BF][0-9]{3}/)
  serie?: string;

  @IsOptional()
  @Matches(/[0-9]{8}/)
  numero?: string;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}
