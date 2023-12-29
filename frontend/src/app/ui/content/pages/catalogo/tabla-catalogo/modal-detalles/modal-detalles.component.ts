import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoint-constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { CatalogoDetallesResponse } from 'src/app/core/controllers/services/business/dto/catalogo/catalogoDetalles.dto';

@Component({
  selector: 'modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.scss'],
})
export class ModalDetallesComponent implements OnInit, OnChanges {
  @Input()
  isModalDetailsVisible: boolean;

  @Input()
  closeDetailsModal: Function;

  @Input()
  idDetails: number;

  itemDetalles: CatalogoDetallesResponse;

  constructor(private readonly businessService: BusinessService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalDetailsVisible']) {
      if (changes['isModalDetailsVisible'].currentValue === true) {
        this.cargarData();
      }
    }
  }

  ngOnInit(): void {}

  public async cargarData() {
    if (!this.idDetails) return;

    this.itemDetalles = null;

    //Consumo de endpoint

    this.itemDetalles = await this.businessService.methodGet<
      CatalogoDetallesResponse,
      {}
    >(
      {
        url: ENDPOINTS.catalogo.consulta.verDetalle,
        params: [this.idDetails.toString()],
      },
      {}
    );
  }
}
