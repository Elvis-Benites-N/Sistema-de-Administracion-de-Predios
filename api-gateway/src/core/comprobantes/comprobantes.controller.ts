import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ComprobantesService } from './comprobantes.service';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES, MODULOS } from '@Constants';
import { EmitirComprobanteRequest } from './dto/emitir-comprobante.dto';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ListarComprobanteInterface } from './interfaces/listado-comprobantes.interface';
import { ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import { AplicarDetraccionRequest } from './dto/aplicar-detraccion.dto';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';
import { RealIP } from 'nestjs-real-ip';
import { ValidadorUtil, ConstructorUtil } from '@Utils';
import { Modulos, ModulosUsuario, UserAgent } from '@Decorators';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import { ComprobanteDetalleParam } from './dto/comprobante-detalle.dto';
import { DetalleComprobanteInterface } from './interfaces/detalle-comprobante.interface';
import { ComprobanteQuery } from './dto/comprobante-consulta.dto';
//@UseGuards(JwtAuthGuard)
@ApiTags('Comprobantes')
@Controller('comprobantes')
export class ComprobantesController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosServiceKafka: ClientKafka,

    @Inject(MICROSERVICES.COMPROBANTES.NAME)
    private readonly comprobantesService: ClientKafka,
    private readonly service: ComprobantesService,
  ) {}

  onModuleInit() {
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.MANTENIMIENTO.EMITIR,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.CONSULTA.LISTADO,
    );
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.COMPROBANTES.CONSULTA.DETALLE,
    );

    this.comprobantesService.subscribeToResponseOf(
      MICROSERVICES.COMPROBANTES.ENDPOINTS.DETRACCION,
    );
  }

  async onModuleDestroy() {
    await this.prediosServiceKafka.close();
    await this.comprobantesService.close();
  }

  @Modulos(
    MODULOS.PAGOS.id,
    MODULOS.PAGOS.funcionalidades.GENERAR_COMPROBANTE_PAGOS.id,
    MODULOS.PAGOS.funcionalidades.GENERAR_COMPROBANTE_PAGOS.operacionId,
  )
  @UseGuards(JwtAuthGuard)
  @Post('/')
  emitirComprobante(
    @Usuario()
    usuario: UsuarioSCAToken,
    @RealIP()
    ip: string,
    @UserAgent()
    userAgent: string,
    @ModulosUsuario()
    modulosUsuario: string[],
    @Body()
    request: EmitirComprobanteRequest,
  ): Observable<ResponseAPI> {
    return this.service.emitirComprobante(
      usuario,
      ValidadorUtil.getSafeIP(ip),
      userAgent,
      ConstructorUtil.obtenerUsuarioSistemaModuloId(
        modulosUsuario,
        MODULOS.PAGOS.id,
        MODULOS.PAGOS.funcionalidades.GENERAR_COMPROBANTE_PAGOS.id,
        MODULOS.PAGOS.funcionalidades.GENERAR_COMPROBANTE_PAGOS.operacionId,
      ),
      request,
    );
  }

  @Get('/')
  listarComprobante(
    @Query()
    query: ComprobanteQuery,
  ): Observable<ListarComprobanteInterface> {
    return this.service.listarComprobante(query);
  }

  @Get('/detalle')
  detalleComprobante(
    @Query()
    param: ComprobanteDetalleParam,
  ): Observable<DetalleComprobanteInterface> {
    return this.service.detalleComprobante(param);
  }

  @Post('/detraccion')
  aplicarDetraccion(
    @Body()
    body: AplicarDetraccionRequest,
  ) {
    return this.service.aplicarDetraccion(body);
  }
}
