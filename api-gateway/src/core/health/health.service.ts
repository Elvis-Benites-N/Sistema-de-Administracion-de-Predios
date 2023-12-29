import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { MSHealth } from './dto/ms-health.dto';
import { MICROSERVICES, VERSION_ACTUAL } from '@Constants';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TIMEOUT_MS } from '@/common/constants/timeout-microservicio.constant';
@Injectable()
export class HealthService {
  //Injectar microservicios en constructor
  constructor(
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
  async getAPIHealth(): Promise<MSHealth> {
    const informacionMS = await Promise.allSettled([
      this.getMicroservicioKafkaHealth(
        this.msArchivos,
        MICROSERVICES.ARCHIVOS.ENDPOINTS.HEALTH,
        TIMEOUT_MS,
        MICROSERVICES.ARCHIVOS.NAME,
      ),

      this.getMicroservicioKafkaHealth(
        this.msPredios,
        MICROSERVICES.PREDIOS.ENDPOINTS.HEALTH,
        TIMEOUT_MS,
        MICROSERVICES.PREDIOS.NAME,
      ),

      this.getMicroservicioKafkaHealth(
        this.msComprobantes,
        MICROSERVICES.COMPROBANTES.ENDPOINTS.HEALTH,
        TIMEOUT_MS,
        MICROSERVICES.COMPROBANTES.NAME,
      ),

      this.getMicroservicioKafkaHealth(
        this.msCatalogo,
        MICROSERVICES.CATALOGO.ENDPOINTS.HEALTH,
        TIMEOUT_MS,
        MICROSERVICES.CATALOGO.NAME,
      ),

      this.getMicroservicioKafkaHealth(
        this.msSCA,
        MICROSERVICES.SCA.ENDPOINTS.HEALTH,
        TIMEOUT_MS,
        MICROSERVICES.SCA.NAME,
      ),
    ]);

    const informacionVariablesDeEntorno = this.variablesEntornoCorrecto();

    const statusCode =
      informacionMS.every((e) => e.status === 'fulfilled') &&
      informacionMS.every(
        (e: any) => (e.value as MSHealth).statusCode === 200,
      ) &&
      informacionVariablesDeEntorno.length === 0
        ? 200
        : 500;

    const msFulfilled = informacionMS.filter((e) => e.status === 'fulfilled');
    const msRejected = informacionMS.filter((e) => e.status === 'rejected');

    return {
      statusCode,
      statusName: statusCode == 200 ? 'OK' : 'Error',
      detail: {
        microserviciosRejected:
          msRejected.length === 0 ? null : msRejected.map((e: any) => e.reason),
        microserviciosError: msFulfilled.every(
          (e: any) => (e.value as MSHealth).statusCode === 200,
        )
          ? null
          : msFulfilled
              .filter((e: any) => (e.value as MSHealth).statusCode !== 200)
              .map((e: any) => e.value),
        variablesDeEntorno:
          informacionVariablesDeEntorno.length === 0
            ? null
            : informacionVariablesDeEntorno,
      },
      version: VERSION_ACTUAL,
    };
  }

  private async getMicroservicioKafkaHealth(
    ms: ClientKafka,
    endpoint: string,
    timeoutMS: number,
    nombreMs: string,
  ): Promise<MSHealth> {
    try {
      const response = await Promise.race([
        firstValueFrom(ms.send<MSHealth, {}>(endpoint, {})),
        new Promise<MSHealth>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  'Timeout al esperar la respuesta del microservicio ' +
                    nombreMs,
                ),
              ),
            timeoutMS,
          ),
        ),
      ]);
      return response;
    } catch (error) {
      throw new ConflictException({
        message: `Microservicio ${nombreMs} no responde`,
      });
    }
  }
  private variablesEntornoCorrecto(): string[] {
    const messages: string[] = [];

    if (!process.env.PORT) {
      messages.push('{PORT} no ha sido configurado');
    }

    if (!process.env.CONTEXT) {
      messages.push('{CONTEXT} no ha sido configurado');
    }

    if (!process.env.CODIGO_APP) {
      messages.push('{CODIGO_APP} no ha sido configurado');
    }

    if (!process.env.JWT_ACCESS_KEY) {
      messages.push('{JWT_ACCESS_KEY} no ha sido configurado');
    }

    if (!process.env.JWT_REFRESH_KEY) {
      messages.push('{JWT_REFRESH_KEY} no ha sido configurado');
    }

    if (!process.env.COOKIE_USE_SECURE) {
      messages.push('{COOKIE_USE_SECURE} no ha sido configurado');
    }

    if (!process.env.FRONTEND_URL) {
      messages.push('{FRONTEND_URL} no ha sido configurado');
    }

    if (!process.env.KAFKA_BROKER) {
      messages.push('{KAFKA_BROKER} no ha sido configurado');
    }

    if (!process.env.KAFKAJS_NO_PARTITIONER_WARNING) {
      messages.push('{KAFKAJS_NO_PARTITIONER_WARNING} no ha sido configurado');
    }

    return messages;
  }
}
