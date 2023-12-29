import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SessionRequest {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(45)
  @MaxLength(45)
  readonly sessionToken: string;
}
