import {
  ACCESS_TOKEN_EXPIRED_TIME,
  REFRESH_TOKEN_EXPIRED_TIME,
} from '@common/const';
import { UserExceptionFactory } from '@common/factories/exception-factory/user.exception.factory';
import { RefreshToken, User } from '@common/typeorm';
import { IUserContext } from '@common/types';
import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword, parseExpirationTime } from '@utils/helper-functions';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { QueueService } from 'src/infrastructure/queue/queue.service';
import { RedisPrefix } from 'src/infrastructure/redis/redis-prefix-enum';
import { RedisRepository } from 'src/infrastructure/redis/redis.repository';
import { Repository } from 'typeorm';
import { v1 as uuidv1 } from 'uuid';
import { CreateUserRequest } from '../user/dto';
import { UserService } from '../user/user.service';
import { RESET_PASSWORD_TIME, VERIFY_REGISTER_TIME } from './auth.const';
import {
  LoginResponse,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  ResendEmailRequest,
  ResetPasswordRequest,
} from './dto';
import { DataToken, IAuthSerivce, Tokens } from './type';

@Injectable()
export class AuthService implements IAuthSerivce {
  constructor(
    private readonly userService: UserService,
    private readonly userExceptionFactory: UserExceptionFactory,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepostiory: Repository<RefreshToken>,
    private readonly i18n: CustomI18nService,
    private readonly queueService: QueueService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisClient: RedisRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<DataToken> {
    const user = await this.userService.findOne({ username: username });

    if (!user) {
      throw this.userExceptionFactory.createUserNotFoundException();
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(this.i18n.t('auth.errors.login_failure'));
    }

    if (!user.isEmailVerified) {
      throw this.userExceptionFactory.createEmailNotVerfiedException();
    }

    const sessionId: string = uuidv1();

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      sessionId,
    };
  }

  async login(userCtx: IUserContext): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.createTokens({
      id: userCtx.id,
      email: userCtx.email,
      username: userCtx.username,
      sessionId: userCtx.sessionId,
    });

    await this.refreshTokenRepostiory.save({
      user: userCtx,
      sessionId: userCtx.sessionId,
      refreshToken,
      expired: this.getRefreshTokenExpiredDate(),
    });

    return {
      id: userCtx.id,
      email: userCtx.email,
      username: userCtx.username,
      lastName: userCtx.lastName,
      firstName: userCtx.firstName,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userCtx: IUserContext): Promise<RefreshTokenResponse> {
    const refreshTokenExist = await this.refreshTokenRepostiory.findOne({
      where: {
        sessionId: userCtx.sessionId,
        refreshToken: userCtx.refreshToken,
      },
    });

    if (!refreshTokenExist) {
      throw new UnauthorizedException(
        this.i18n.t('auth.errors.invalid_refresh_token'),
      );
    }

    const { accessToken, refreshToken } = await this.createTokens({
      id: userCtx.id,
      sessionId: userCtx.sessionId,
      username: userCtx.username,
      email: userCtx.email,
      firstName: userCtx.firstName,
      lastName: userCtx.lastName,
    });

    await this.refreshTokenRepostiory.save({
      ...refreshTokenExist,
      refreshToken,
      expired: this.getRefreshTokenExpiredDate(),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    const { forgotPasswordToken, password } = data;

    const user = await this.userService.findOne({
      forgotPasswordToken,
    });

    if (!user) {
      throw this.userExceptionFactory.createUserNotFoundException();
    }

    if (user.forgotPasswordExpired < new Date()) {
      throw this.userExceptionFactory.createForgotPasswordTokenExpiredException();
    }

    user.password = await hashPassword(password);
    user.forgotPasswordToken = null;
    user.forgotPasswordExpired = null;

    const userUpdated = await this.userService.update(user);

    this.queueService.addJobNotificationChangePasswordSuccess({
      email: userUpdated.email,
      fullName: `${userUpdated.firstName} ${userUpdated.lastName}`,
    });
  }

  async requestResetPassword(data: RequestResetPasswordRequest) {
    const user = await this.userService.findOne({
      username: data.username,
      email: data.email,
    });

    if (!user) {
      throw this.userExceptionFactory.createUserNotFoundException();
    }

    if (!user.isEmailVerified) {
      throw this.userExceptionFactory.createEmailNotVerfiedException();
    }

    user.forgotPasswordToken = crypto.randomBytes(64).toString('hex');
    user.forgotPasswordExpired = new Date(Date.now() + RESET_PASSWORD_TIME);

    await this.userService.update(user);

    this.queueService.addJobToResetPassword({
      token: user.forgotPasswordToken,
      email: user.email,
      subject: `${this.i18n.t('email.password.reset')}`,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  }

  async logout(userCtx: IUserContext) {
    const deletedRefreshToken = await this.refreshTokenRepostiory.delete({
      user: userCtx,
      sessionId: userCtx.sessionId,
    });

    if (!deletedRefreshToken) {
      throw new UnauthorizedException();
    }

    const timeRemainAccessToken =
      new Date(userCtx.exp * 1000).getTime() - Date.now();
    const expiredTimeAccessToken =
      timeRemainAccessToken > 0 ? Math.ceil(timeRemainAccessToken / 1000) : 1;

    await this.addTokenToBlackList(
      RedisPrefix.ACCESS_TOKEN,
      userCtx.accessToken,
      expiredTimeAccessToken,
    );
  }

  async register(createUser: CreateUserRequest): Promise<User> {
    const user = await this.userService.findOne({
      username: createUser.username,
    });

    if (user && !user.isEmailVerified) {
      throw this.userExceptionFactory.createEmailNotVerfiedException();
    }

    if (user) {
      throw this.userExceptionFactory.createUserAlreadyExistException();
    }

    const newUser = await this.userService.create(createUser);

    this.queueService.addJobToVerifyEmailQueue({
      token: newUser.emailVerfiedToken,
      email: newUser.email,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      subject: `${this.i18n.t('email.register_verify')}`,
    });

    return newUser;
  }

  async resendEmailVerify(data: ResendEmailRequest): Promise<void> {
    const user = await this.userService.findOne({
      username: data.username,
      email: data.email,
    });

    if (!user) {
      throw this.userExceptionFactory.createUserNotFoundException();
    }

    if (user.isEmailVerified) {
      throw this.userExceptionFactory.createEmailWasVerifiedException();
    }

    if (user.emailVerfiedExpired < new Date()) {
      throw new UnauthorizedException(this.i18n.t('auth.errors.expired_token'));
    }

    user.emailVerfiedToken = crypto.randomBytes(64).toString('hex');
    user.emailVerfiedExpired = new Date(Date.now() + VERIFY_REGISTER_TIME);

    const updatedUser = await this.userService.update(user);

    this.queueService.addJobToVerifyEmailQueue({
      token: updatedUser.emailVerfiedToken,
      email: updatedUser.email,
      fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      subject: `${this.i18n.t('email.register_verify')}`,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.userService.findOne({ emailVerfiedToken: token });

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('auth.errors.invalid_token'));
    }

    if (user.isEmailVerified) {
      throw this.userExceptionFactory.createEmailWasVerifiedException();
    }

    if (user.emailVerfiedExpired < new Date()) {
      throw new UnauthorizedException(this.i18n.t('auth.errors.expired_token'));
    }

    await this.userService.update({
      ...user,
      emailVerfiedExpired: null,
      emailVerfiedToken: null,
      isEmailVerified: true,
    });
  }

  private getRefreshTokenExpiredDate(): Date {
    const expiredDate = new Date();
    expiredDate.setMilliseconds(
      expiredDate.getMilliseconds() +
        parseExpirationTime(REFRESH_TOKEN_EXPIRED_TIME),
    );

    return expiredDate;
  }

  private async createTokens(data: DataToken): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: data.id,
          username: data.username,
          email: data.email,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY_ACCESS_JWT'),
          expiresIn: ACCESS_TOKEN_EXPIRED_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: data.id,
          username: data.username,
          email: data.email,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY_REFRESH_JWT'),
          expiresIn: REFRESH_TOKEN_EXPIRED_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async addTokenToBlackList(
    prefix: RedisPrefix,
    token: string,
    expiredTime: number,
  ) {
    await this.redisClient.setWithExpiry(prefix, token, '1', expiredTime);
  }
}
