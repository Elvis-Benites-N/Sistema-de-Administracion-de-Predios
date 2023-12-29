import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
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
              groupId: 'pagos-predios-apigateway-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
