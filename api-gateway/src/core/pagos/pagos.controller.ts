import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Query,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosInforgestListadoQuery } from './dto/pagos-inforgest-listado.dto';
import { MICROSERVICES } from '@Constants';
import { ClientKafka } from '@nestjs/microservices';
import { PagoPrediosDetalladoInterface } from './interface/pago-predios-detallado.interface';
import { Observable } from 'rxjs';
import { PagoPrediosListadoInterface } from './interface/pagos-predios-listado.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Pagos')
@Controller('pagos')
export class PagosController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosServiceKafka: ClientKafka,
    readonly pagosService: PagosService,
  ) {}

  onModuleInit() {
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.PREDIOS.LISTADO,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.PREDIOS.DETALLE,
    );
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.ITEMS.MANTENIMIENTO.PREDIOS
        .CREAR_EQUIVALENCIA,
    );
    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.INFORGEST.LISTADO,
    );

    this.prediosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.INFORGEST.DETALLE,
    );
  }

  async onModuleDestroy() {
    await this.prediosServiceKafka.close();
  }

  @Get('/predios')
  listadoPagosPredios(
    @Query()
    query: PagosInforgestListadoQuery,
  ): Observable<PagoPrediosListadoInterface[]> {
    return this.pagosService.listadoPagosPredios(query);
  }

  @Get('/predios/:id')
  obtenerDetallePagoPredios(
    @Param('id')
    id: number,
  ): Observable<PagoPrediosDetalladoInterface> {
    return this.pagosService.obtenerDetallePagoPredios(id);
  }

  @Get('/inforgest')
  listadoPagosInforgest(
    @Query()
    query: PagosInforgestListadoQuery,
  ) {
    return this.pagosService.listadoPagosInforgest(query);
  }

  @Get('/inforgest/:id')
  obtenerDetallePagoInforgest(
    @Param('id')
    id: number,
  ) {
    return this.pagosService.obtenerDetallePagoInforgest(id);
  }
}
