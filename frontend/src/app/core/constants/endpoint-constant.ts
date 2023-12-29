export const ENDPOINTS = Object.freeze({
  pagos: {
    consulta: {
      listado: 'pagos/predios',
      verDetalle: 'pagos/predios/$1',
    },
  },
  comprobantes: {
    consulta: {
      listado: 'comprobantes',
      verPdf: 'archivos/pdf/$1',
      detraccion: 'comprobantes/detraccion',
      verDetalle: 'comprobantes/detalle?publicKey=$1&idTipoComprobante=$2',
    },
  },
  catalogo: {
    consulta: {
      listado: 'items/predios',
      sirItems: 'items/sir',
      inforgestItems: 'items/inforgest',
      crearEquivalencia: 'items',
      detallesSIR: 'items/sir/$1',
      verDetalle: 'items/predios/$1',
      eliminarEquivalencia: 'items/predios/eliminar/$1',
      editarEquivalencia: 'items/fecha-vencimiento',
    },
  },
});
