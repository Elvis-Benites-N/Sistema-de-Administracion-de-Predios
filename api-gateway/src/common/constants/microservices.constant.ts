export const MICROSERVICES = Object.freeze({
  SCA: {
    NAME: 'SCA_MICROSERVICE',
    ENDPOINTS: {
      HEALTH: 'ms_sca.health',
      AUTH: {
        PUBLIC_KEY: 'ms_sca.auth.public_key',
        SESSION: 'ms_sca.auth.session',
        REFRESH_TOKEN: 'ms_sca.auth.refresh_token',
        LOGOUT: 'ms_sca.auth.logout',
      },
    },
  },
  PREDIOS: {
    NAME: 'PREDIOS_MICROSERVICE',
    ENDPOINTS: {
      HEALTH: 'ms_pre.health',
      ITEMS: {
        CONSULTA: {
          CATALOGO: {
            DETALLE_SIR: 'ms_pre.items.consulta.catalogo.detalle_sir',
          },
          INFORGEST: {
            DETALLE_INFORGEST:
              'ms_pre.items.consulta.inforgest.detalle_inforgest',
            LISTADO_INFORGEST:
              'ms_pre.items.consulta.inforgest.listado_inforgest',
          },
          PREDIOS: {
            LISTADO_PREDIOS: 'ms_pre.items.consulta.predios.listado_predios',
            DETALLE_PREDIOS: 'ms_pre.items.consulta.predios.detalle_predios',
            LISTADO_SIR_FILTRADO:
              'ms_pre.items.consulta.predios.listado_sir_filtrado',
            LISTADO_INFORGEST_FILTRADO:
              'ms_pre.items.consulta.predios.listado_inforgest_filtrado',
          },
        },
        MANTENIMIENTO: {
          PREDIOS: {
            CREAR_EQUIVALENCIA:
              'ms_pre.items.mantenimiento.predios.crear_equivalencia',
            ELIMINAR_EQUIVALENCIA:
              'ms_pre.items.mantenimiento.predios.eliminar_equivalencia',
            ACTUALIZAR_FECHA_EXPIRACION:
              'ms_pre.items.consulta.predios.actualizar_fecha_expiracion',
          },
        },
      },
      PAGOS: {
        CONSULTA: {
          INFORGEST: {
            LISTADO: 'ms_pre.pagos.consulta.inforgest.listado',
            DETALLE: 'ms_pre.pagos.consulta.inforgest.detalle',
          },
          PREDIOS: {
            LISTADO: 'ms_pre.pagos.consulta.predios.listado',
            DETALLE: 'ms_pre.pagos.consulta.predios.detalle',
          },
        },
      },
      COMPROBANTES: {
        CONSULTA: {
          LISTADO: 'ms_pre.comprobantes.consulta.listado',
          DETALLE: 'ms_pre.comprobantes.consulta.detalle',
        },
        MANTENIMIENTO: {
          EMITIR: 'ms_pre.comprobantes.mantenimiento.emitir',
        },
      },
    },
  },
  CATALOGO: {
    NAME: 'CATALOGO_MICROSERVICE',
    ENDPOINTS: {
      HEALTH: 'ms_cat.health',
      CONSULTA: {
        ITEMS: 'ms_cat.items.consulta',
        POR_ID: 'ms_cat.items.consulta.por_id',
        DETALLE_FACTURADOR: 'ms_pre.items.consulta.detalle_facturador',
      },
    },
  },
  ARCHIVOS: {
    NAME: 'ARCHIVOS_SERVICE',
    ENDPOINTS: {
      HEALTH: 'ms_arc.health',
      GET_ARCHIVO: 'ms_arc.pdf.get_archivo',
    },
  },
  COMPROBANTES: {
    NAME: 'COMPROBANTES_SERVICE',
    ENDPOINTS: {
      HEALTH: 'ms_com.health',
      DETRACCION: 'ms_com.comprobantes.consulta.detraccion',
    },
  },
});
