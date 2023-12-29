import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { ComprobanteResponse } from 'src/app/core/controllers/services/business/dto/comprobantes/comprobantes.dto';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';
import { TableHeader } from 'src/app/core/interfaces/table-header.interface';
import { ReporteUtil } from 'src/app/core/utils/reporte.util';

@Component({
  selector: 'tabla-comprobantes',
  templateUrl: './tabla-comprobantes.component.html',
  styleUrls: ['./tabla-comprobantes.component.scss'],
})
export class TablaComprobantesComponent implements OnInit {
  @Input()
  paginacionResponse: PaginacionResponse<ComprobanteResponse>;

  @Input()
  columnas: TableHeader[];

  @Output()
  cambiarPagina: EventEmitter<number>;

  @Output()
  cambiarTamanio: EventEmitter<number>;

  public mostrarModalPdf: boolean;
  public idPrimaryKey: string;
  public isModalMailVisible: boolean;

  constructor(private businessService: BusinessService) {
    this.cambiarPagina = new EventEmitter();
    this.cambiarTamanio = new EventEmitter();
    this.mostrarModalPdf = false;
    this.isModalMailVisible = false;
  }

  ngOnInit(): void {
    this.inicializarColumnas();
  }

  private inicializarColumnas() {
    this.columnas = [
      {
        nombre: 'SERIE Y NÚMERO',
        nzAlign: 'center',
        nzFlex: '142px',
      },
      {
        nombre: 'INFORMACIÓN DEL CLIENTE',
        nzAlign: 'center',
        nzFlex: 'auto',
      },
      {
        nombre: 'TIPO DE COMPROBANTE',
        nzAlign: 'center',
        nzFlex: '200px',
      },
      {
        nombre: 'FECHA COMPROBANTE',
        nzAlign: 'center',
        nzFlex: '250px',
      },
      {
        nombre: 'MONTO',
        nzAlign: 'center',
        nzFlex: '156px',
      },
      {
        nombre: 'NOTA DE CRÉDITO',
        nzAlign: 'center',
        nzFlex: '150px',
      },
      {
        nombre: 'ESTADO SUNAT',
        nzAlign: 'center',
        nzFlex: '150px',
      },
      {
        nombre: 'ACCIONES',
        nzAlign: 'center',
        nzFlex: '180px',
      },
    ];
  }

  nzPageIndexChange(pagina: number) {
    this.cambiarPagina.emit(pagina);
  }

  nzPageSizeChange(size: number) {
    this.cambiarTamanio.emit(size);
  }

  public cerrarModalPdf = () => {
    this.mostrarModalPdf = false;
  };

  public mostrarModalFilePdf(id: string) {
    this.mostrarModalPdf = true;
    this.idPrimaryKey = id;
  }

  async descargarComprobantePDF(id: string) {
    const comprobantePDF = await this.businessService.methodGetReport<any>({
      url: ENDPOINTS.comprobantes.consulta.verPdf,
      params: [id],
    });

    ReporteUtil.descargarComprobante(
      comprobantePDF,
      `ComprobanteSGP_${id}`,
      '.pdf'
    );
  }

  public showMailModal() {
    this.isModalMailVisible = true;
  }

  public closeMailModal = () => {
    this.isModalMailVisible = false;
  };
}
