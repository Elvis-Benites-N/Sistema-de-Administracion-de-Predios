import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import { EmitirComprobanteRequest } from './dto/emitir-comprobante.dto';
import { ListarComprobanteInterface } from './interfaces/listado-comprobantes.interface';
import { AplicarDetraccionRequest } from './dto/aplicar-detraccion.dto';
import { ConstructorUtil } from '@Utils';
import { ComprobanteDetalleParam } from './dto/comprobante-detalle.dto';
import { DetalleComprobanteInterface } from './interfaces/detalle-comprobante.interface';
import { ComprobanteQuery } from './dto/comprobante-consulta.dto';

@Injectable()
export class ComprobantesService {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosService: ClientKafka,

    @Inject(MICROSERVICES.COMPROBANTES.NAME)
    private readonly comprobantesService: ClientKafka,
  ) {}

  emitirComprobante(
    usuario: UsuarioSCAToken,
    ip: string,
    userAgent: string,
    usuarioSistemaModuloId: number,
    request: EmitirComprobanteRequest,
  ): Observable<ResponseAPI> {
    request.usuario = ConstructorUtil.obtenerUsuarioModel(
      usuario,
      usuarioSistemaModuloId,
      ip,
      userAgent,
    );
    return this.prediosService.send<ResponseAPI, EmitirComprobanteRequest>(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.MANTENIMIENTO.EMITIR,
      request,
    );
  }

  listarComprobante(
    query: ComprobanteQuery,
  ): Observable<ListarComprobanteInterface> {
    return this.prediosService.send<ListarComprobanteInterface>(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.CONSULTA.LISTADO,
      query,
    );
  }

  detalleComprobante(
    param: ComprobanteDetalleParam,
  ): Observable<DetalleComprobanteInterface> {
    return this.prediosService.send<DetalleComprobanteInterface>(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.CONSULTA.DETALLE,
      param,
    );
  }

  aplicarDetraccion(body: AplicarDetraccionRequest) {
    return this.comprobantesService.send(
      MICROSERVICES.COMPROBANTES.ENDPOINTS.DETRACCION,
      body.ids,
    );
  }
}
