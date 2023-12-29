import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';
import { MICROSERVICES } from '@Constants';
import { RefreshSCAToken, ResponseAPI, UsuarioSCAToken } from '@Interfaces';
import { ValidadorUtil } from '@Utils';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.dto';
import { SessionRequest } from './dto/session.dto';
import { Usuario } from './jwt/access-token-jwt/auth.decorator';
import { OptionalJwtAuthGuard } from './jwt/access-token-jwt/optional-access.guard';
import { OptionalJwtRefreshGuard } from './jwt/refresh-token-jwt/optional-refresh.guard';
import { Refresh } from './jwt/refresh-token-jwt/refresh.decorator';
import { JwtRefreshGuard } from './jwt/refresh-token-jwt/refresh.guard';

@Controller('auth')
export class AuthController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MICROSERVICES.SCA.NAME)
    private readonly msSCA: ClientKafka,
    private readonly service: AuthService,
  ) {}

  onModuleInit() {
    this.msSCA.subscribeToResponseOf(MICROSERVICES.SCA.ENDPOINTS.AUTH.SESSION);
    this.msSCA.subscribeToResponseOf(
      MICROSERVICES.SCA.ENDPOINTS.AUTH.REFRESH_TOKEN,
    );
    this.msSCA.subscribeToResponseOf(
      MICROSERVICES.SCA.ENDPOINTS.AUTH.PUBLIC_KEY,
    );
  }

  async onModuleDestroy() {
    await this.msSCA.close();
  }

  @Post('session')
  @HttpCode(HttpStatus.OK)
  session(
    @RealIP()
    ip: string,
    @Body()
    body: SessionRequest,
    @Res({ passthrough: true })
    response: Response,
  ): Promise<ResponseAPI<LoginResponse>> {
    return this.service.session(ValidadorUtil.getSafeIP(ip), body, response);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @RealIP()
    ip: string,
    @Refresh()
    refresh: RefreshSCAToken,
    @Res({ passthrough: true })
    response: Response,
  ): Promise<ResponseAPI<LoginResponse>> {
    return this.service.refresh(ValidadorUtil.getSafeIP(ip), refresh, response);
  }

  @UseGuards(OptionalJwtAuthGuard, OptionalJwtRefreshGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Usuario()
    usuario: UsuarioSCAToken,
    @Refresh()
    refresh: RefreshSCAToken,
    @Res({ passthrough: true })
    response: Response,
    @RealIP()
    ip: string,
  ): Promise<ResponseAPI> {
    return this.service.logout(
      response,
      usuario,
      refresh,
      ValidadorUtil.getSafeIP(ip),
    );
  }
}
