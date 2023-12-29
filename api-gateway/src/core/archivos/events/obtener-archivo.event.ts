import { CarpetaEnum } from '@Enums';

interface ObtenerArchivoFTPEventNamed {
  readonly nombre: string;
  readonly extension?: string;
  readonly carpeta: CarpetaEnum;
}

export class ObtenerArchivoFTPEvent {
  constructor(private readonly data: ObtenerArchivoFTPEventNamed) {}
  toString(): string {
    return JSON.stringify(this.data);
  }
}
