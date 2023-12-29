import { Inject, Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { EncryptUtil } from 'src/app/core/utils/encrypt.util';
import { environment } from 'src/environments/environment';
import { APIService } from '../api/api.service';
import { APP_CONFIG, Config } from 'src/app/core/config/config';

import {
  SessionRequest,
  UsuarioInfo,
  UsuarioInfoModulo,
} from './dto/session.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {
  // CAMBIAR
  private readonly cookieUsuario = 'weVdng7hWS';
  // CAMBIAR
  private readonly modulosUsuario = '13yg123jeDs';
  // NO CAMBIAR
  private readonly secretModuleKey =
    'qtp7mhnl533awzkgflhrdu2r3pb1ho8lrrvpu7yqq5yj3f7j';
  public usuario: UsuarioInfo;
  public modulos: string[];

  constructor(
    injector: Injector,
    private readonly cookieService: CookieService,
    @Inject(APP_CONFIG)
    readonly config: Config
  ) {
    // super(injector, environment.services.apigateway.url, 'auth');
    super(injector, config.services.backend.url, 'auth');
    this.cargarDatos();
  }

  public get usuarioClone(): UsuarioInfo {
    return { ...this.usuario };
  }

  async session(
    request: SessionRequest
  ): Promise<ResponseAPI<UsuarioInfoModulo>> {
    const response = await this.post<
      ResponseAPI<UsuarioInfoModulo>,
      SessionRequest
    >({
      url: `session`,
      request,
    });

    this.usuario = response.data.usuario;

    localStorage.setItem(this.modulosUsuario, response.data.modulos);

    this.guardarUsuario();
    this.cargarModulos();

    return response;
  }

  refresh(): Observable<ResponseAPI<UsuarioInfo>> {
    const url = `${this.baseURL}/${this.prefix}/refresh`;

    return this.http.post<ResponseAPI<UsuarioInfo>>(url, {}).pipe(
      map((res) => {
        this.usuario = res.data;
        this.guardarUsuario();
        return res;
      })
    );
  }

  private logout(): Promise<ResponseAPI> {
    return this.post<ResponseAPI, {}>({
      url: `logout`,
      request: {},
    });
  }

  public existeSesion(): boolean {
    return this.usuario !== null && this.usuario !== undefined;
  }

  cerrarSesion() {
    this.limpiarDatos();
    return this.logout();
  }

  limpiarDatos() {
    this.usuario = null;
    this.cookieService.delete(this.cookieUsuario);
    localStorage.removeItem(this.modulosUsuario);
  }
  private cargarDatos(): void {
    this.cargarUsuario();
    this.cargarModulos();
  }

  private cargarModulos(): void {
    const modulosItem = localStorage.getItem(this.modulosUsuario) ?? '';
    if (modulosItem.length === 0) return;

    const modulosDecrypted = EncryptUtil.decryptBase64(
      modulosItem,
      this.secretModuleKey
    );

    if (!modulosDecrypted || modulosDecrypted.length === 0) return;

    this.modulos = modulosDecrypted.split(',');
  }

  private cargarUsuario(): void {
    const userInfoItem = this.cookieService.get(this.cookieUsuario);
    if (!userInfoItem || userInfoItem.trim().length === 0) return;

    const userInfoDecrypted = EncryptUtil.oldDecryptBase64(
      userInfoItem,
      environment.constantes.userEncryptKey
    );

    if (!userInfoDecrypted || userInfoDecrypted.trim().length === 0) return;

    this.usuario = JSON.parse(userInfoDecrypted);
  }

  private guardarUsuario(): void {
    this.cookieService.set(
      this.cookieUsuario,
      EncryptUtil.oldEncryptBase64(
        JSON.stringify(this.usuario),
        environment.constantes.userEncryptKey
      )
    );
  }

  public getModulos(): string {
    return localStorage.getItem(this.modulosUsuario) ?? '';
  }
}
