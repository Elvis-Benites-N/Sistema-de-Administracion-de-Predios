import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { MICROSERVICES } from '@Constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './jwt/access-token-jwt/auth.strategy';
import { RefreshStrategy } from './jwt/refresh-token-jwt/refresh.strategy';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
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
              groupId: 'sca-app-name-api-consumer',
            },
          },
        }),
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshStrategy],
})
export class AuthModule {}
