import { BadRequestException } from '@nestjs/common';
import { ConstructorUtil, NumberUtil } from '@Utils';

export namespace FechaUtil {
  export function validarFechaFiltro(query: any): void {
    if (!query.fechaInicial && !query.fechaFinal) return;

    const hoy = new Date();
    const hoyString =
      `${NumberUtil.anteponerCero(hoy.getDate(), 2)}-` +
      `${NumberUtil.anteponerCero(hoy.getMonth() + 1, 2)}-` +
      `${NumberUtil.anteponerCero(hoy.getFullYear(), 4)}`;

    const fechaInicialDate = ConstructorUtil.obtenerDateDeFechaCadena(
      query.fechaInicial ?? hoyString,
    );
    const fechaFinalDate = ConstructorUtil.obtenerDateDeFechaCadena(
      query.fechaFinal ?? hoyString,
    );
    fechaFinalDate.setDate(fechaFinalDate.getDate() + 1);

    if (fechaFinalDate.getTime() - fechaInicialDate.getTime() < 86400000)
      throw new BadRequestException({
        message: 'La fecha inicial debe ser menor por un día a la fecha final',
      });

    query.fechaInicialDate = fechaInicialDate;
    query.fechaFinalDate = fechaFinalDate;
  }

  export function fechaFiltro(fecha: string): boolean {
    const regex =
      /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    if (regex.test(fecha)) {
      const year = fecha.split('-')[2];

      if (Number(year) < 2020 || Number(year) > 2030) return false;

      return true;
    }

    return false;
  }

  export function toFechaYHora(fecha: Date): string {
    const dia = NumberUtil.anteponerCero(fecha.getDate(), 2);
    const mes = NumberUtil.anteponerCero(fecha.getMonth() + 1, 2);
    const anio = fecha.getFullYear().toString();

    const hora = NumberUtil.anteponerCero(fecha.getHours(), 2);
    const minutos = NumberUtil.anteponerCero(fecha.getMinutes(), 2);

    return `${dia}/${mes}/${anio} ${hora}:${minutos} hrs`;
  }

  export function toFecha(fecha: Date): string {
    const dia = NumberUtil.anteponerCero(fecha.getDate(), 2);
    const mes = NumberUtil.anteponerCero(fecha.getMonth() + 1, 2);
    const anio = fecha.getFullYear().toString();
    return `${dia}/${mes}/${anio}`;
  }
}
