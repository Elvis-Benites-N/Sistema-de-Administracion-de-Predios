interface LogoutEventNamed {
  readonly idUsuarioSistema: number;
  readonly ip: string;
  readonly codigo: string;
}

export class LogoutEvent {
  constructor(private readonly data: LogoutEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
