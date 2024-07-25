import { BlacklistExceptionFactory } from '@common/factories/exception-factory/black-list.exception.factory';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RedisPrefix } from 'src/infrastructure/redis/redis-prefix-enum';
import { RedisRepository } from 'src/infrastructure/redis/redis.repository';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisRepository,
    private readonly blacklistExceptionFactory: BlacklistExceptionFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const accessToken: string = request?.user.accessToken;
    const blackAccessToken = this.redisService.get(
      RedisPrefix.ACCESS_TOKEN,
      accessToken,
    );

    if (!blackAccessToken) {
      throw this.blacklistExceptionFactory.createAccessTokenInvalidException();
    }

    return true;
  }
}
