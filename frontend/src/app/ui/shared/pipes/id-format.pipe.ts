import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFormat',
  standalone: true,
})
export class IdFormatPipe implements PipeTransform {
  transform(id: number): string {
    const idCeros = String(id).padStart(7, '0');
    return 'S' + idCeros;
  }
}
