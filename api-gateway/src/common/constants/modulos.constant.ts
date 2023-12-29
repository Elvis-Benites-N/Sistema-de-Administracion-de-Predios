export const MODULOS = Object.freeze({
  CATALOGO: {
    id: 6,
    funcionalidades: {
      AÑADIR_ITEM: {
        id: 29,
        operacionId: 1,
        operacionNombre: 'Crear',
      },
      VISUALIZAR_CATALOGO: {
        id: 30,
        operacionId: 2,
        operacionNombre: 'Leer',
      },
      ELIMINAR_ITEM: {
        id: 31,
        operacionId: 4,
        operacionNombre: 'Eliminar',
      },
    },
  },
  PAGOS: {
    id: 7,
    funcionalidades: {
      LISTARPAGOS: {
        id: 32,
        operacionId: 2,
        operacionNombre: 'Leer',
      },
      VER_DETALLE_PAGOS: {
        id: 33,
        operacionId: 2,
        operacionNombre: 'Leer',
      },
      GENERAR_COMPROBANTE_PAGOS: {
        id: 34,
        operacionId: 1,
        operacionNombre: 'Crear',
      },
    },
  },
  COMPROBANTES: {
    id: 8,
    funcionalidades: {
      LISTAR_COMPROBANTES: {
        id: 35,
        operacionId: 2,
        operacionNombre: 'Leer',
      },
      VISUALIZAR_COMPROBANTES: {
        id: 36,
        operacionId: 2,
        operacionNombre: 'Leer',
      },
      DESCARGAR_COMPROBANTES: {
        id: 37,
        operacionId: 5,
        operacionNombre: 'Reporte',
      },
      ENVIAR_CORREO_COMPROB: {
        id: 38,
        operacionId: 5,
        operacionNombre: 'Reporte',
      },
    },
  },
});
