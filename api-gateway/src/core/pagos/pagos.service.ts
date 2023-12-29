import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { PagosInforgestListadoQuery } from './dto/pagos-inforgest-listado.dto';
import { Observable } from 'rxjs';
import { PagoPrediosDetalladoInterface } from './interface/pago-predios-detallado.interface';

@Injectable()
export class PagosService {
  constructor(
    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly prediosService: ClientKafka,
  ) {}

  listadoPagosPredios(query: PagosInforgestListadoQuery) {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.PREDIOS.LISTADO,
      query,
    );
  }

  obtenerDetallePagoPredios(
    id: number,
  ): Observable<PagoPrediosDetalladoInterface> {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.PREDIOS.DETALLE,
      id,
    );
  }

  listadoPagosInforgest(query: PagosInforgestListadoQuery) {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.INFORGEST.LISTADO,
      query,
    );
  }

  obtenerDetallePagoInforgest(id: number) {
    return this.prediosService.send(
      MICROSERVICES.PREDIOS.ENDPOINTS.PAGOS.CONSULTA.INFORGEST.DETALLE,
      id,
    );
  }
}
