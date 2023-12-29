import { UsuarioModel } from '../auth/usuario.model';
import { UsuarioSCAToken, PaginacionResponse } from '@Interfaces';

export namespace ConstructorUtil {
  export function buildPaginationData<T>(
    paginacionResponse: [T[], number],
    limit: number,
    offset: number,
  ): PaginacionResponse<T> {
    const totalData = paginacionResponse[1];
    let numberOfPages = Math.trunc(totalData / limit);

    if (numberOfPages != totalData / limit) numberOfPages++;

    let page: number;

    if (offset == 0) page = 1;
    else page = Math.trunc(offset / limit) + 1;

    return {
      data: paginacionResponse[0],
      totalData: totalData,
      itemsPerPage: limit,
      numberOfPages: numberOfPages,
      page: page,
    };
  }

  export function obtenerDateDeFechaCadena(fecha: string): Date {
    const partes = fecha.split('-');

    const year = Number(partes[2]);
    const month = Number(partes[1]) - 1;
    const day = Number(partes[0]);

    return new Date(year, month, day);
  }

  export function obtenerUsuarioModel(
    usuario: UsuarioSCAToken,
    usuarioSistemaModuloId: number,
    ip: string,
    userAgent: string,
  ): UsuarioModel {
    const e = new UsuarioModel();
    e.id = usuario.id;
    e.idUnidep = usuario.unidepId;
    e.nombres = usuario.nombres;
    e.apellidos = usuario.apellidos;
    e.email = usuario.email;
    e.numeroDocumento = usuario.numeroDocumento;
    e.idUsuarioSistema = usuario.usuarioSistemaId;
    e.idUsuarioSistemaModulo = usuarioSistemaModuloId;
    e.ip = ip;
    e.cliente = userAgent;
    return e;
  }

  export function obtenerUsuarioSistemaModuloId(
    modulos: string[],
    moduloId: number,
    funcionalidadId: number,
    operacionId: number,
  ): number {
    return Number(
      modulos
        .find((e) =>
          e.endsWith(`${moduloId}-${funcionalidadId}-${operacionId}`),
        )
        ?.split('-')[0] ?? '0',
    );
  }
}
