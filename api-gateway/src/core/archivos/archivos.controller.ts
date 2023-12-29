import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { MICROSERVICES } from '@Constants';
import { ArchivosService } from './archivos.service';
import { Response } from 'express';

@ApiTags('Archivos')
@Controller('archivos')
export class ArchivosController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.ARCHIVOS.NAME)
    private readonly archivosServiceKafka: ClientKafka,
    private readonly archivosService: ArchivosService,
  ) {}

  onModuleInit() {
    this.archivosServiceKafka.subscribeToResponseOf(
      MICROSERVICES.ARCHIVOS.ENDPOINTS.GET_ARCHIVO,
    );
  }
  onModuleDestroy() {
    this.archivosServiceKafka.close();
  }

  @Get('/pdf/:id')
  getArchivo(
    @Param('id')
    id: string,
    @Query('extension')
    extension: string,
    @Res()
    res: Response,
  ) {
    this.archivosService.getArchivo(id, extension, res);
  }
}
