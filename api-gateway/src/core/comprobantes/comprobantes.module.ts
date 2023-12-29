import { Module } from '@nestjs/common';
import { ComprobantesService } from './comprobantes.service';
import { ComprobantesController } from './comprobantes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.PREDIOS.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'predios',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'predios-apigateway-consumer',
            },
          },
        }),
      },
    ]),

    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.COMPROBANTES.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'comprobantes',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'comprobantes-microservicio-predios-apigateway-consumer',
            },
          },
        }),
      },
    ]),
  ],
  providers: [ComprobantesService],
  controllers: [ComprobantesController],
})
export class ComprobantesModule {}
