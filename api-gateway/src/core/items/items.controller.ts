import { Modulos, ModulosUsuario, UserAgent } from '@/common/decorators';
import { ConstructorUtil, ValidadorUtil } from '@/common/utils';
import { MICROSERVICES, MODULOS } from '@Constants';
import { ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { Observable } from 'rxjs';
import { Usuario } from '../auth/jwt/access-token-jwt/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt/access-token-jwt/auth.guard';
import { ActualizarFechaExpiracionDto } from './dto/actualizar-fecha-expiracion.dto';
import { CrearItemRequest } from './dto/crear-item-equivalencia.dto';
import { ItemsEquivalenciaListadoQuery } from './dto/listar-items-predios.dto';
import { ItemInforgestDetalleInterface } from './interface/item-detalle.interface';
import { ItemEquivalenciaDetalleInterface } from './interface/item-equivalencia-detalle.interface';
import { ItemPredioListadoInterface } from './interface/item-equivalencia-listado.interface';
import { ItemInforgestListadoInterface } from './interface/item-inforgest-listado.interface';
import { ItemSirListadoInterface } from './interface/item-sir-listado.interface';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosServiceKafka: ClientKafka,

    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly catalogoServiceKafka: ClientKafka,

    private readonly itemsService: ItemsService,
  ) {}
  onModuleInit() {
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .CREAR_EQUIVALENCIA,
    );
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.INFORGEST
        .DETALLE_INFORGEST,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.INFORGEST
        .LISTADO_INFORGEST,
    );

    this.catalogoServiceKafka.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.CONSULTA.ITEMS,
    );

    this.catalogoServiceKafka.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.CONSULTA.POR_ID,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS.LISTADO_PREDIOS,
    );
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS.DETALLE_PREDIOS,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .ELIMINAR_EQUIVALENCIA,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS
        .LISTADO_SIR_FILTRADO,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.CONSULTA.PREDIOS
        .LISTADO_INFORGEST_FILTRADO,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .ACTUALIZAR_FECHA_EXPIRACION,
    );
  }

  async onModuleDestroy() {
    await this.prediosServiceKafka.close();
    await this.catalogoServiceKafka.close();
  }

  @Modulos(
    MODULOS.CATALOGO.id,
    MODULOS.CATALOGO.funcionalidades.AÑADIR_ITEM.id,
    MODULOS.CATALOGO.funcionalidades.AÑADIR_ITEM.operacionId,
  )
  @UseGuards(JwtAuthGuard)
  @Post('/')
  crearItemEquivalencia(
    @Usuario()
    usuario: UsuarioSCAToken,
    @RealIP()
    ip: string,
    @UserAgent()
    userAgent: string,
    @ModulosUsuario()
    modulosUsuario: string[],
    @Body()
    request: CrearItemRequest,
  ): Observable<ResponseAPI> {
    return this.itemsService.crearItemEquivalencia(
      usuario,
      ValidadorUtil.getSafeIP(ip),
      userAgent,
      ConstructorUtil.obtenerUsuarioSistemaModuloId(
        modulosUsuario,
        MODULOS.CATALOGO.id,
        MODULOS.CATALOGO.funcionalidades.AÑADIR_ITEM.id,
        MODULOS.CATALOGO.funcionalidades.AÑADIR_ITEM.operacionId,
      ),
      request,
    );
  }

  @Get('/inforgest/:id')
  detalleInforgestItem(
    @Param('id')
    id: number,
  ): Observable<ItemInforgestDetalleInterface> {
    return this.itemsService.detalleInforgestItem(id);
  }

  @Get('/sir')
  listarItemsSirFiltrados(): Observable<ItemSirListadoInterface> {
    return this.itemsService.listarItemsSirFiltrados();
  }

  @Get('/sir/:id')
  detalleItemSir(
    @Param('id')
    id: number,
  ) {
    return this.itemsService.detalleItemSir(id);
  }

  @Get('/inforgest')
  listadoItemsInforgest(): Observable<ItemInforgestListadoInterface[]> {
    return this.itemsService.listarItemsInforgestFiltrados();
  }
  S;
  @Get('/predios')
  listadoItemPredios(
    @Query()
    query: ItemsEquivalenciaListadoQuery,
  ): Observable<ItemPredioListadoInterface[]> {
    return this.itemsService.listadoItemEquivalencia(query);
  }

  @Get('/predios/:id')
  obtenerDetalleItemEquivalencia(
    @Param('id')
    id: number,
  ): Observable<ItemEquivalenciaDetalleInterface> {
    return this.itemsService.obtenerDetalleItemEquivalencia(id);
  }

  @Patch('fecha-vencimiento')
  actualizarFechaExpiracion(
    @Body()
    body: ActualizarFechaExpiracionDto,
  ): Observable<ResponseAPI> {
    return this.itemsService.actualizarFechaExpiracion(body);
  }

  @Modulos(
    MODULOS.CATALOGO.id,
    MODULOS.CATALOGO.funcionalidades.ELIMINAR_ITEM.id,
    MODULOS.CATALOGO.funcionalidades.ELIMINAR_ITEM.operacionId,
  )
  @UseGuards(JwtAuthGuard)
  @Delete('/predios/eliminar/:id')
  eliminarItemEquivalencia(
    @Usuario()
    usuario: UsuarioSCAToken,
    @RealIP()
    ip: string,
    @UserAgent()
    userAgent: string,
    @ModulosUsuario()
    modulosUsuario: string[],
    @Param('id')
    id: number,
  ): Observable<ResponseAPI> {
    return this.itemsService.eliminarItemEquivalencia(
      usuario,
      ValidadorUtil.getSafeIP(ip),
      userAgent,
      ConstructorUtil.obtenerUsuarioSistemaModuloId(
        modulosUsuario,
        MODULOS.CATALOGO.id,
        MODULOS.CATALOGO.funcionalidades.ELIMINAR_ITEM.id,
        MODULOS.CATALOGO.funcionalidades.ELIMINAR_ITEM.operacionId,
      ),
      id,
    );
  }
}
