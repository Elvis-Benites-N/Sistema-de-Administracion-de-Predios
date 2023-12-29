import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Component({
  selector: 'acceso-denegado',
  templateUrl: './acceso-denegado.page.html',
  styleUrls: ['./acceso-denegado.page.scss'],
})
export class AccesoDenegadoPage implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.cerrarSesion();
  }
}
