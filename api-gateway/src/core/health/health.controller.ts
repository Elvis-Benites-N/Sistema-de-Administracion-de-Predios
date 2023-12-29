import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { MSHealth } from './dto/ms-health.dto';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { MICROSERVICES } from '@/common/constants';
import { ClientKafka } from '@nestjs/microservices';

@ApiTags('Health')
@Controller('health')
export class HealthController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: HealthService,
    @Inject(MICROSERVICES.ARCHIVOS.NAME)
    private readonly msArchivos: ClientKafka,

    @Inject(MICROSERVICES.PREDIOS.NAME)
    private readonly msPredios: ClientKafka,

    @Inject(MICROSERVICES.COMPROBANTES.NAME)
    private readonly msComprobantes: ClientKafka,

    @Inject(MICROSERVICES.CATALOGO.NAME)
    private readonly msCatalogo: ClientKafka,

    @Inject(MICROSERVICES.SCA.NAME)
    private readonly msSCA: ClientKafka,
  ) {}

  onModuleInit() {
    this.msCatalogo.subscribeToResponseOf(
      MICROSERVICES.CATALOGO.ENDPOINTS.HEALTH,
    );
    this.msArchivos.subscribeToResponseOf(
      MICROSERVICES.ARCHIVOS.ENDPOINTS.HEALTH,
    );
    this.msPredios.subscribeToResponseOf(
      MICROSERVICES.PREDIOS.ENDPOINTS.HEALTH,
    );
    this.msComprobantes.subscribeToResponseOf(
      MICROSERVICES.COMPROBANTES.ENDPOINTS.HEALTH,
    );
    this.msSCA.subscribeToResponseOf(MICROSERVICES.SCA.ENDPOINTS.HEALTH);
  }

  async onModuleDestroy() {
    await this.msCatalogo.close();
    await this.msArchivos.close();
    await this.msComprobantes.close();
    await this.msPredios.close();
    await this.msSCA.close();
  }

  @Get('/')
  getAPIHealth(): Promise<MSHealth> {
    return this.service.getAPIHealth();
  }
}
