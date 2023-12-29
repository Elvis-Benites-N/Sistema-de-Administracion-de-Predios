interface RefreshControlAccesoEventNamed {
  readonly idUsuario: number;
  readonly codigoSistema: string;
  readonly refreshToken: string;
  readonly ip: string;
  readonly codigo: string;
}

export class RefreshEvent {
  constructor(private readonly data: RefreshControlAccesoEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
