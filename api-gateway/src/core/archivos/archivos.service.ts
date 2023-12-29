import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from '@Constants';
import { Response } from 'express';
import { ObtenerArchivoFTPEvent } from './events/obtener-archivo.event';
import { CarpetaEnum } from '@Enums';

@Injectable()
export class ArchivosService {
  constructor(
    @Inject(MICROSERVICES.ARCHIVOS.NAME)
    private readonly microserviceArchivos: ClientKafka,
  ) {}

  async getArchivo(
    id: string,
    extension: string,
    res: Response,
  ): Promise<void> {
    try {
      const bufferString = await firstValueFrom(
        this.microserviceArchivos.send<string, ObtenerArchivoFTPEvent>(
          MICROSERVICES.ARCHIVOS.ENDPOINTS.GET_ARCHIVO,
          new ObtenerArchivoFTPEvent({
            carpeta: CarpetaEnum.SFE,
            nombre: id,
            extension,
          }),
        ),
      );
      const buffer = Buffer.from(bufferString, 'base64');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length,
      });
      res.send(buffer);
    } catch (error) {
      res.statusMessage = 'No existe el archivo solicitado';
      res.status(500).json({
        error,
      });
    }
  }
}
