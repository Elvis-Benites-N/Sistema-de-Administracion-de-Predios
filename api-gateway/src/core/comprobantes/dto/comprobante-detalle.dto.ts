import { TipoComprobanteEnum } from '@/common/enums/tipo-comprobante.enum';
import { IsDefined, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class ComprobanteDetalleParam {
  @IsNotEmpty()
  @IsUUID()
  publicKey: string;

  @IsDefined()
  @IsEnum(TipoComprobanteEnum)
  idTipoComprobante: TipoComprobanteEnum;

  toString() {
    return JSON.stringify({
      ...this,
    });
  }
}

export interface ComprobanteDetalle {}
