import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogoResponse } from 'src/app/core/controllers/services/business/dto/catalogo/catalogo.dto';
import { PaginacionResponse } from 'src/app/core/interfaces/paginacion-response.interface';

@Component({
  selector: 'tabla-catalogo',
  templateUrl: './tabla-catalogo.component.html',
  styleUrls: ['./tabla-catalogo.component.scss'],
})
export class TablaCatalogoComponent implements OnInit {
  @Input()
  paginacionResponse: PaginacionResponse<CatalogoResponse>;

  @Output()
  cambiarPagina: EventEmitter<number>;

  @Output()
  cambiarTamanio: EventEmitter<number>;

  public mostrarModalEliminar: boolean;
  public isModalDetailsVisible: boolean;
  public idEquivalencia: number;
  public isEditModalVisible: boolean;
  public isEmitted: boolean;

  constructor() {
    this.cambiarPagina = new EventEmitter();
    this.cambiarTamanio = new EventEmitter();
    this.mostrarModalEliminar = false;

    this.isModalDetailsVisible = false;
    this.isEditModalVisible = false;
  }

  ngOnInit(): void {}

  nzPageIndexChange(pagina: number) {
    this.cambiarPagina.emit(pagina);
  }

  nzPageSizeChange(size: number) {
    this.cambiarTamanio.emit(size);
  }

  public mostrarModalDelete(id: number) {
    this.mostrarModalEliminar = true;
    if (!id) {
      return;
    }

    this.idEquivalencia = id;
  }

  public cerrarModalDelete = () => {
    this.mostrarModalEliminar = false;
  };

  public openModalDetails(id: number) {
    this.isModalDetailsVisible = true;
    if (!id) {
      return;
    }

    this.idEquivalencia = id;
  }

  public closeDetailsModal = () => {
    this.isModalDetailsVisible = false;
  };

  public openModalEditable(id: number) {
    this.isEditModalVisible = true;
    if (!id) {
      return;
    }

    this.idEquivalencia = id;
  }

  public closeEditModal = () => {
    this.isEditModalVisible = false;
  };
}
