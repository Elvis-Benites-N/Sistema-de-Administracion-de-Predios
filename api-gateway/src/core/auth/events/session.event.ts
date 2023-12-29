interface SessionEventNamed {
  readonly username: string;
  readonly sessionToken: string;
  readonly ip: string;
  readonly codigoSistema: string;
}

export class SessionEvent {
  constructor(private readonly data: SessionEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
