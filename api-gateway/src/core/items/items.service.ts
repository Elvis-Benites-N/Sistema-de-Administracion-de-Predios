import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { CrearItemRequest } from './dto/crear-item-equivalencia.dto';
import { ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import { Observable } from 'rxjs';
import { ItemInforgestDetalleInterface } from './interface/item-detalle.interface';
import { ItemsEquivalenciaListadoQuery } from './dto/listar-items-predios.dto';
import { ItemPredioListadoInterface } from './interface/item-equivalencia-listado.interface';
import { ItemEquivalenciaDetalleInterface } from './interface/item-equivalencia-detalle.interface';
import { ConstructorUtil } from '@/common/utils';
import { EliminarItemEquivalenciaEvent } from './events/eliminar-item-equivalencia.event';
import { ActualizarFechaExpiracionDto } from './dto/actualizar-fecha-expiracion.dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosService: ClientKafka,

    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly catalogoService: ClientKafka,
  ) {}

  crearItemEquivalencia(
    usuario: UsuarioSCAToken,
    ip: string,
    userAgent: string,
    usuarioSistemaModuloId: number,
    request: CrearItemRequest,
  ): Observable<ResponseAPI> {
    request.usuario = ConstructorUtil.obtenerUsuarioModel(
      usuario,
      usuarioSistemaModuloId,
      ip,
      userAgent,
    );
    return this.prediosService.send<ResponseAPI>(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .CREAR_EQUIVALENCIA,
      request,
    );
  }

  detalleInforgestItem(id: number): Observable<ItemInforgestDetalleInterface> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.INFORGEST
        .DETALLE_INFORGEST,
      id,
    );
  }

  detalleItemSir(id: number) {
    return this.catalogoService.send(
      MICROSERVICES.CATALOGO.ENDPOINTS.CONSULTA.POR_ID,
      id,
    );
  }

  listadoItemEquivalencia(
    query: ItemsEquivalenciaListadoQuery,
  ): Observable<ItemPredioListadoInterface[]> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS.LISTADO_PREDIOS,
      query,
    );
  }

  obtenerDetalleItemEquivalencia(
    id: number,
  ): Observable<ItemEquivalenciaDetalleInterface> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS.DETALLE_PREDIOS,
      id,
    );
  }

  eliminarItemEquivalencia(
    usuario: UsuarioSCAToken,
    ip: string,
    userAgent: string,
    usuarioSistemaModuloId: number,
    id: number,
  ): Observable<ResponseAPI> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .ELIMINAR_EQUIVALENCIA,
      new EliminarItemEquivalenciaEvent({
        id,
        usuario: ConstructorUtil.obtenerUsuarioModel(
          usuario,
          usuarioSistemaModuloId,
          ip,
          userAgent,
        ),
      }),
    );
  }

  actualizarFechaExpiracion(
    body: ActualizarFechaExpiracionDto,
  ): Observable<ResponseAPI> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .ACTUALIZAR_FECHA_EXPIRACION,
      body,
    );
  }

  listarItemsSirFiltrados() {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS
        .LISTADO_SIR_FILTRADO,
      {},
    );
  }

  listarItemsInforgestFiltrados() {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS
        .LISTADO_INFORGEST_FILTRADO,
      {},
    );
  }
}
