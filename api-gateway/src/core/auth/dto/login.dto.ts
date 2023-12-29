import { IdLabel } from '@Interfaces';

export interface Unidep {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  email: string;
}

export interface UsuarioInfo {
  id: number;
  usuarioSistemaId: number;
  persona: Persona;
  tipoUnidep: IdLabel;
  oficina: IdLabel;
  nivelAcceso: IdLabel;
  unidep: Unidep;
  unidepPadreNivel2?: Unidep;
}

export interface Tokens {
  accessToken: string;
  accessTokenTimeSeconds: number;
  refreshToken: string;
  refreshTokenTimeSeconds: number;
}

export interface LoginSCAResponse {
  usuario: UsuarioInfo;
  modulos: string;
  tokens: Tokens;
}
export interface UsuarioInfoExtra {
  establecimiento: IdLabel;
}
export interface LoginResponse {
  usuario: UsuarioInfo;
  modulos: string;
}
