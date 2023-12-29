export namespace ReporteUtil {
  export function descargarComprobante(
    excel: any,
    nombreDelArchivo: string,
    extension: string = '.xlsx'
  ): void {
    let url = window.URL.createObjectURL(excel);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${nombreDelArchivo}${extension}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
