import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { PagosDetallesResponse } from 'src/app/core/controllers/services/business/dto/pagos/pagos-detalle.dto';

@Component({
  selector: 'modal-ver',
  templateUrl: './modal-ver.component.html',
  styleUrls: ['./modal-ver.component.scss'],
})
export class ModalVerComponent implements OnInit, OnChanges {
  @Input()
  isModalVisible: boolean;

  @Input()
  cerrarModal: Function;

  @Input()
  idDetalle: number;

  itemDetalles: PagosDetallesResponse;
  public mostrarModalGp: boolean;

  constructor(private readonly businessService: BusinessService) {
    this.mostrarModalGp = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible']) {
      if (changes['isModalVisible'].currentValue === true) {
        this.cargarData();
      }
    }
  }

  ngOnInit(): void {}

  public async cargarData() {
    if (!this.idDetalle) return;

    this.itemDetalles = null;

    //Consumo de endpoint

    this.itemDetalles = await this.businessService.methodGet<
      PagosDetallesResponse,
      {}
    >(
      {
        url: ENDPOINTS.pagos.consulta.verDetalle,
        params: [this.idDetalle.toString()],
      },
      {}
    );
  }

  public mostrarModalGenerar() {
    this.mostrarModalGp = true;
    this.cerrarModal();
  }

  public cerrarModalGenerar = () => {
    this.mostrarModalGp = false;
  };
}
