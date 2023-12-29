import { SetMetadata } from '@nestjs/common';

export const Modulos = (...modulos: number[]) =>
  SetMetadata('modulos', modulos);
