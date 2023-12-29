import { isInt } from 'class-validator';
export namespace NumberUtil {
  export function esEnteroPositivo(valor: any): boolean {
    const valorNumber = Number(valor);

    if (!isInt(valorNumber)) return false;

    if (valorNumber < 0) return false;

    return true;
  }

  export function isNullOrUndefined<T>(
    obj: T | null | undefined
  ): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }

  export function numeroConComas(x: string) {
    var parts = x.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  export function anteponerCero(numero: number, digitos: number): string {
    return ('0'.repeat(digitos) + numero).slice(-digitos);
  }
}
