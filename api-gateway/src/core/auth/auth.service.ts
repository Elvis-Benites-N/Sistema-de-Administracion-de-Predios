import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import {
  getCookieAccessKey,
  getCookieRefreshKey,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  MICROSERVICES,
} from '@Constants';
import { RefreshSCAToken, ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import { EncryptUtil } from '@Utils';
import { LoginResponse, LoginSCAResponse, Tokens } from './dto/login.dto';
import { SessionRequest } from './dto/session.dto';
import { LogoutEvent } from './events/logout.event';
import { RefreshEvent } from './events/refresh.event';
import { SessionEvent } from './events/session.event';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MICROSERVICES.SCA.NAME)
    private readonly msSCA: ClientKafka,
  ) {}

  public async session(
    ip: string,
    request: SessionRequest,
    response: Response,
  ): Promise<ResponseAPI<LoginResponse>> {
    const scaResponse = await firstValueFrom(
      this.msSCA.send<ResponseAPI<LoginSCAResponse>, SessionEvent>(
        MICROSERVICES.SCA.ENDPOINTS.AUTH.SESSION,
        new SessionEvent({
          username: request.username,
          sessionToken: request.sessionToken,
          codigoSistema: process.env.CODIGO_APP,
          ip,
        }),
      ),
    );

    this.setCookies(scaResponse.data.tokens, response);

    return {
      message: scaResponse.message,
      data: {
        usuario: scaResponse.data.usuario,
        modulos: scaResponse.data.modulos,
      },
    };
  }

  public async refresh(
    ip: string,
    refresh: RefreshSCAToken,
    response: Response,
  ): Promise<ResponseAPI<LoginResponse>> {
    const scaResponse = await firstValueFrom(
      this.msSCA.send<ResponseAPI<LoginSCAResponse>, RefreshEvent>(
        MICROSERVICES.SCA.ENDPOINTS.AUTH.REFRESH_TOKEN,
        new RefreshEvent({
          codigoSistema: process.env.CODIGO_APP,
          codigo: refresh.codigo,
          ip,
          idUsuario: refresh.idUsuario,
          refreshToken: refresh.token,
        }),
      ),
    );

    this.setCookies(scaResponse.data.tokens, response);

    return {
      message: scaResponse.message,
      data: {
        usuario: scaResponse.data.usuario,
        modulos: scaResponse.data.modulos,
      },
    };
  }

  public async logout(
    response: Response,
    usuario: UsuarioSCAToken,
    refresh: RefreshSCAToken,
    ip: string,
  ): Promise<ResponseAPI> {
    response.clearCookie(ACCESS_TOKEN_KEY);
    response.clearCookie(REFRESH_TOKEN_KEY);

    if (usuario && refresh) {
      await firstValueFrom(
        this.msSCA.emit<ResponseAPI, LogoutEvent>(
          MICROSERVICES.SCA.ENDPOINTS.AUTH.LOGOUT,
          new LogoutEvent({
            codigo: refresh.codigo,
            idUsuarioSistema: usuario.usuarioSistemaId,
            ip,
          }),
        ),
      );
    }

    return { message: 'Sesión cerrada' };
  }

  private setCookies(tokens: Tokens, response: Response): void {
    const expireAccess = new Date();
    expireAccess.setSeconds(
      expireAccess.getSeconds() + tokens.accessTokenTimeSeconds,
    );

    response.cookie(
      ACCESS_TOKEN_KEY,
      EncryptUtil.encryptBase64(tokens.accessToken, getCookieAccessKey()),
      {
        httpOnly: true,
        secure: process.env.COOKIE_USE_SECURE === 'true',
        expires: expireAccess,
      },
    );

    const expireRefresh = new Date();
    expireRefresh.setSeconds(
      expireRefresh.getSeconds() + tokens.refreshTokenTimeSeconds,
    );
    response.cookie(
      REFRESH_TOKEN_KEY,
      EncryptUtil.encryptBase64(tokens.refreshToken, getCookieRefreshKey()),
      {
        httpOnly: true,
        secure: process.env.COOKIE_USE_SECURE === 'true',
        expires: expireRefresh,
      },
    );
  }
}
