import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MICROSERVICES } from '@/common/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.CATALOGO.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'catalogo',
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
              groupId: 'cat-health-predios-api-consumer',
            },
          },
        }),
      },
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
              groupId: 'arc-health-predios-api-consumer',
            },
          },
        }),
      },

      {
        name: MICROSERVICES.PREDIOS.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'predios',
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
              groupId: 'pre-health-predios-api-consumer',
            },
          },
        }),
      },

      {
        name: MICROSERVICES.COMPROBANTES.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'comprobantes',
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
              groupId: 'com-health-predios-api-consumer',
            },
          },
        }),
      },

      {
        name: MICROSERVICES.SCA.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'sca',
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
              groupId: 'sca-health-predios-api-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
