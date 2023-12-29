import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ItemsModule } from './items/items.module';
import { PagosModule } from './pagos/pagos.module';
import { ComprobantesModule } from './comprobantes/comprobantes.module';
import { AuthModule } from './auth/auth.module';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [
    HealthModule,
    ItemsModule,
    PagosModule,
    ComprobantesModule,
    AuthModule,
    ArchivosModule,
  ],
})
export class CoreModule {}
