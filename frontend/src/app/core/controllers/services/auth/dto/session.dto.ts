import { IdLabel } from 'src/app/core/interfaces/id-label.interface';

export interface SessionRequest {
  readonly username: string;
  readonly sessionToken: string;
}

export interface UsuarioInfoModulo {
  usuario: UsuarioInfo;
  modulos: string;
}

export interface UsuarioModulo {
  moduloId: number;
  moduloNombre: string;
  funcionalidadId: number;
  funcionalidadNombre: string;
  operacionId: number;
  operacionNombre: string;
}

export interface PersonaInfo {
  id: number;
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  email: string;
  telefono: string;
  direccion: string;
}
export interface UnidepInfo {
  id: number;
  codigo: string;
  descripcion: string;
}

// export interface UsuarioInfo {
//   modulos: UsuarioModulo[];
//   usuario: UsuarioPersonalInfo;
// }

export interface UsuarioInfo {
  id: number;
  persona: PersonaInfo;
  tipoUnidep: IdLabel;
  oficina: IdLabel;
  nivelAcceso: IdLabel;
  unidep: UnidepInfo;
  unidepPadreNivel2: UnidepInfo;
}
