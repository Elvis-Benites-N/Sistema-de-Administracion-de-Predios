import { IsArray, IsDefined } from 'class-validator';

export class AplicarDetraccionRequest {
  @IsArray()
  @IsDefined()
  ids: number[];
}
