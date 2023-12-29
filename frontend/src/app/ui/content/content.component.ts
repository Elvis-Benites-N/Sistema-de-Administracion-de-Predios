import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MODULOS } from 'src/app/core/constants/modulos.contant';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @ViewChild('bodyContainer')
  bodyContainer: ElementRef<HTMLElement>;
  public ModulosType = MODULOS;
  public selectedSection: string;
  public version: string;
  constructor(private authService: AuthService, private router: Router) {
    this.getSelectedSection();
  }
  ngOnInit(): void {
    this.version = environment.constantes.version;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/landing');
  }
  getSelectedSection() {
    const selectedSection = localStorage.getItem('selectedSection');
    if (selectedSection) {
      this.selectedSection = selectedSection;
    }
  }

  setSelectedSection(section: string) {
    localStorage.setItem('selectedSection', section);
    this.selectedSection = section;
  }
}
