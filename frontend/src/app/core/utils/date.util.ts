import { NumberUtil } from './number.util';

export namespace DateUtil {
  export function construirFormatDDMMYYYY(fecha: Date): string {
    if (!fecha) return null;

    const day = NumberUtil.anteponerCero(fecha.getDate(), 2);
    const month = NumberUtil.anteponerCero(fecha.getMonth() + 1, 2);
    const year = fecha.getFullYear();

    return `${day}-${month}-${year}`;
  }

  export function fromStringToDate(dateString: string) {
    if (dateString) {
      const date = new Date(dateString);
      return date;
    }
    return null;
  }
}
