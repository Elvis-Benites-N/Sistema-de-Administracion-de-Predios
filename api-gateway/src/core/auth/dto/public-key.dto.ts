import { IsNotEmpty, IsString } from 'class-validator';

export class PublicKeyRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      username: this.username,
    };
  }
}

export interface PublicKeyResponse {
  secretKey: string;
}
