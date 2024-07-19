import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenGuard, BlacklistGuard, RefreshTokenGuard } from './guards';
import { RefreshToken } from './refresh-token.entity';
import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    BlacklistGuard,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ global: true }),
    ConfigModule,
    RedisModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
})
export class AuthModule {}
