import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagosResponse } from 'src/app/core/controllers/services/business/dto/pagos/pagos.dto';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';
import { TableHeader } from 'src/app/core/interfaces/table-header.interface';

@Component({
  selector: 'tabla-pagos',
  templateUrl: './tabla-pagos.component.html',
  styleUrls: ['./tabla-pagos.component.scss'],
})
export class TablaPagosComponent implements OnInit {
  @Input()
  paginacionResponse: PaginacionResponse<PagosResponse>;

  @Input()
  columnas: TableHeader[];

  @Input()
  refrescarData: Function;

  @Output()
  cambiarPagina: EventEmitter<number>;

  @Output()
  cambiarTamanio: EventEmitter<number>;

  public mostrarModalP: boolean;
  public mostrarModalGp: boolean;
  public recepcionarID: number;
  public estaCargadoData: boolean;

  constructor() {
    this.mostrarModalP = false;
    this.mostrarModalGp = false;
    this.cambiarPagina = new EventEmitter();
    this.cambiarTamanio = new EventEmitter();
    this.estaCargadoData = false;
    this.recepcionarID = 0;
  }

  ngOnInit(): void {
    this.inicializarColumnas();
  }

  private inicializarColumnas() {
    this.columnas = [
      {
        nombre: 'CÓDIGO',
        nzAlign: 'center',
        nzFlex: '104px',
      },
      {
        nombre: 'INFORMACIÓN DEL CLIENTE',
        nzAlign: 'center',
        nzFlex: 'auto',
      },
      {
        nombre: 'FECHA DE PAGO',
        nzAlign: 'center',
        nzFlex: '200px',
      },
      {
        nombre: 'FECHA COMPROBANTE',
        nzAlign: 'center',
        nzFlex: '200px',
      },
      {
        nombre: 'COMPROBANTE',
        nzAlign: 'center',
        nzFlex: '200px',
      },
      {
        nombre: 'ACCIONES',
        nzAlign: 'center',
        nzFlex: '320px',
      },
    ];
  }

  nzPageIndexChange(pagina: number) {
    this.cambiarPagina.emit(pagina);
  }

  nzPageSizeChange(size: number) {
    this.cambiarTamanio.emit(size);
  }

  public mostrarModalPagos(id: number) {
    this.mostrarModalP = true;
    if (!id) {
      return;
    }
    this.recepcionarID = id;
  }

  public cerrarModalPagos = () => {
    this.mostrarModalP = false;
  };

  public mostrarModalGenerar(id: number) {
    this.mostrarModalGp = true;
    if (!id) {
      return;
    }
    this.recepcionarID = id;
  }

  public cerrarModalGenerar = () => {
    this.mostrarModalGp = false;
  };
}
