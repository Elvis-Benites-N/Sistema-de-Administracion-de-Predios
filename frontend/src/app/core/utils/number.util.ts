export namespace NumberUtil {
  export function anteponerCero(numero: number, digitos: number): string {
    return ('0'.repeat(digitos) + numero).slice(-digitos);
  }
}
