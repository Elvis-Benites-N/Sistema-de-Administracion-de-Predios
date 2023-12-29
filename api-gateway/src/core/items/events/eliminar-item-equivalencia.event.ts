import { UsuarioModel } from '@/common/auth/usuario.model';

interface EliminarItemEquivalenciaEventNamed {
  readonly id: number;
  readonly usuario: UsuarioModel;
}

export class EliminarItemEquivalenciaEvent {
  constructor(private readonly data: EliminarItemEquivalenciaEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}
