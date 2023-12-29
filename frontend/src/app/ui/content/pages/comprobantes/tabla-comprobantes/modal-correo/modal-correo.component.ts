import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-correo',
  templateUrl: './modal-correo.component.html',
  styleUrls: ['./modal-correo.component.scss'],
})
export class ModalCorreoComponent implements OnInit {
  @Input()
  isModalMailVisible: boolean;

  @Input()
  closeMailModal: Function;

  constructor() {}

  ngOnInit(): void {}
}
