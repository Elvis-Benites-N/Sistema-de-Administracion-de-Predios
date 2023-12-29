import { Module } from '@nestjs/common';
import { ArchivosController } from './archivos.controller';
import { ArchivosService } from './archivos.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.ARCHIVOS.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'archivos',
              brokers: [process.env.KAFKA_BROKER],
              ssl: process.env.KAFKA_SSL_USE === 'true',
              sasl:
                process.env.KAFKA_SSL_USE === 'true'
                  ? {
                      mechanism: 'plain',
                      username: process.env.KAFKA_SSL_USERNAME,
                      password: process.env.KAFKA_SSL_PASSWORD,
                    }
                  : null,
            },
            consumer: {
              groupId: 'archivos-apigateway-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ArchivosController],
  providers: [ArchivosService],
})
export class ArchivosModule {}
