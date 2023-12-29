import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { UsuarioInfo } from 'src/app/core/controllers/services/auth/dto/session.dto';
import { Breadcrumb } from 'src/app/core/interfaces/breadcrumbs.interface';
@Component({
  selector: 'titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  public title: '';
  private navigationSubs: Subscription;
  public description: '';
  public usuario: UsuarioInfo;
  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {
    this.title = '';
    this.breadcrumbs = [];
    this.navigationSubs = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        setTimeout(() => {
          this.breadcrumbs = [];
          this.parseBreadCrumbs(this.router.routerState.snapshot.root);
        });
      });
  }
  ngOnInit(): void {
    this.usuario = this.authService.usuarioClone;
  }

  parseBreadCrumbs(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      this.breadcrumbs.push(node.data['breadcrumb']);
    }

    if (node.firstChild) this.parseBreadCrumbs(node.firstChild);
    else {
      this.title = node.data['title'] ?? 'Sín título :c';
      this.description =
        node.data['description'] ?? 'Te olvidaste poner la descripción crack';
    }
  }
  ngOnDestroy(): void {
    this.navigationSubs?.unsubscribe();
  }
}
