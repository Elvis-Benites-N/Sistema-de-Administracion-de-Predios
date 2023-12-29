import { Component, OnInit } from '@angular/core';
import { AuthModule } from '../auth.module';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';

@Component({
  selector: 'app-sesion-expirada',
  templateUrl: './sesion-expirada.page.html',
  styleUrls: ['./sesion-expirada.page.scss'],
})
export class SesionExpiradaPage implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.limpiarDatos();
  }
}
