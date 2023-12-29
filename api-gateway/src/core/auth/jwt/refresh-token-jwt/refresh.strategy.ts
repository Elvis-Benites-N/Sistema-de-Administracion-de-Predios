import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getCookieRefreshKey, REFRESH_TOKEN_KEY } from '@Constants';
import { RefreshSCAToken } from '@Interfaces';
import { EncryptUtil } from '@Utils';
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      !req.cookies ||
      !(REFRESH_TOKEN_KEY in req.cookies) ||
      req.cookies[REFRESH_TOKEN_KEY].length === 0
    ) {
      return null;
    }

    const refreshTokenDecrypted = EncryptUtil.decryptBase64(
      req.cookies[REFRESH_TOKEN_KEY],
      getCookieRefreshKey(),
    );

    if (!refreshTokenDecrypted || refreshTokenDecrypted.trim().length === 0)
      return null;

    return refreshTokenDecrypted;
  }

  validate(req: Request, payload: any): RefreshSCAToken {
    const { ...userData } = payload;

    delete userData['iat'];
    delete userData['exp'];

    const refreshTokenDecrypted = EncryptUtil.decryptBase64(
      req.cookies[REFRESH_TOKEN_KEY],
      getCookieRefreshKey(),
    );

    return {
      ...userData,
      token: refreshTokenDecrypted,
    };
  }
}
