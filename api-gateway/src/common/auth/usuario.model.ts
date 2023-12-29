import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UsuarioModel {
  @ApiProperty()
  @IsDefined()
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @Min(1)
  idUnidep: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numeroDocumento: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioSistema: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioSistemaModulo: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ip: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cliente: string;
}
