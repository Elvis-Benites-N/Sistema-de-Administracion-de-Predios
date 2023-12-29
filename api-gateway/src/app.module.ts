import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RouterMiddleware } from '@Configs';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouterMiddleware).forRoutes('*');
  }
}
