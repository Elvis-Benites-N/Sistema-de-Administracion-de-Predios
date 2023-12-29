import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
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
              groupId: 'items-predios-apigateway-consumer',
            },
          },
        }),
      },
      {
        name: MICROSERVICES.CATALOGO.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'catalogo',
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: 'catalogoN-predios-apigateway-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
