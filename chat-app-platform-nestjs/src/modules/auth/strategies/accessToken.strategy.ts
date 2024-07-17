import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY_ACCESS_JWT'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const accessToken = req.get('Authorization').replace('Bearer', '').trim();

    return {
      ...payload,
      accessToken,
    };
  }
}
