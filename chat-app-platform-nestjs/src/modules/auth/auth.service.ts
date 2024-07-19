import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  ACCESS_TOKEN_EXPIRED_TIME,
  REFRESH_TOKEN_EXPIRED_TIME,
} from '@common/const';
import { ExceptionFactory } from '@common/factories/exception-factory/exception.factory';
import { RefreshToken, User } from '@common/typeorm';
import { IUserContext } from '@common/types';
import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hashRawText, parseExpirationTime } from '@utils/helper-functions';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailType } from 'src/infrastructure/mail/type';
import { QueueService } from 'src/infrastructure/queue/queue.service';
import { RedisPrefix } from 'src/infrastructure/redis/redis-prefix-enum';
import { RedisRepository } from 'src/infrastructure/redis/redis.repository';
import { Repository } from 'typeorm';
import { v1 as uuidv1 } from 'uuid';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserResponse,
} from '../user/dto';
import { UserService } from '../user/user.service';
import { RESET_PASSWORD_TIME, VERIFY_REGISTER_TIME } from './auth.const';
import {
  LoginResponse,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  ResendEmailRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from './dto';
import { DataToken, IAuthSerivce, Tokens } from './type';

@Injectable()
export class AuthService implements IAuthSerivce {
  constructor(
    private readonly userService: UserService,
    private readonly exceptionFactory: ExceptionFactory,
    @InjectMapper('classes') private readonly classMapper: Mapper,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepostiory: Repository<RefreshToken>,
    private readonly i18n: CustomI18nService,
    private readonly queueService: QueueService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisClient: RedisRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<DataToken> {
    const user = await this.userService.findUser({ username: username });

    if (!user) {
      throw this.exceptionFactory.createUserNotFoundException();
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(this.i18n.t('auth.login_failure'));
    }

    if (!user.isEmailVerified) {
      throw this.exceptionFactory.createEmailNotVerfiedException();
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
      lastName: userCtx.lastName,
      firstName: userCtx.firstName,
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
        this.i18n.t('auth.invalid_refresh_token'),
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

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    const { forgotPasswordToken, password } = data;

    const user = await this.userService.findUser({
      forgotPasswordToken,
    });

    if (!user) {
      throw this.exceptionFactory.createUserNotFoundException();
    }

    if (user.forgotPasswordExpired < new Date()) {
      throw this.exceptionFactory.createForgotPasswordTokenExpiredException();
    }

    user.password = await hashRawText(password);
    user.forgotPasswordToken = null;
    user.forgotPasswordExpired = null;

    const sessionId: string = uuidv1();
    const [{ accessToken, refreshToken }, userUpdated] = await Promise.all([
      this.createTokens({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        sessionId,
      }),
      this.userService.updateUser(user),
    ]);

    await this.refreshTokenRepostiory.save({
      refreshToken,
      sessionId,
      user: userUpdated,
      expired: this.getRefreshTokenExpiredDate(),
    });

    const userReturn = this.classMapper.map(userUpdated, User, UserResponse);

    this.queueService.addJobNotificationChangePasswordSuccess({
      email: userUpdated.email,
      fullName: `${userUpdated.firstName} ${userUpdated.lastName}`,
    });

    return {
      ...userReturn,
      accessToken,
      refreshToken,
    };
  }

  async requestResetPassword(data: RequestResetPasswordRequest) {
    const user = await this.userService.findUser(data);

    if (!user) {
      throw this.exceptionFactory.createUserNotFoundException();
    }

    user.forgotPasswordToken = crypto.randomBytes(64).toString('hex');
    user.forgotPasswordExpired = new Date(Date.now() + RESET_PASSWORD_TIME);

    await this.userService.updateUser(user);

    this.queueService.addJobToResetPassword({
      token: user.forgotPasswordToken,
      email: user.email,
      subject: 'Reset your password',
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

  async register(createUser: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userService.findUser({
      username: createUser.username,
    });

    if (user && !user.isEmailVerified) {
      throw this.exceptionFactory.createEmailNotVerfiedException();
    }

    if (user) {
      throw this.exceptionFactory.createUserAlreadyExistException();
    }

    const newUser = await this.userService.createUser(createUser);

    this.queueService.addJobToVerifyEmailQueue({
      token: newUser.emailVerfiedToken,
      email: newUser.email,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      subject: 'Verify your email',
    });

    return this.classMapper.map(newUser, User, CreateUserResponse);
  }

  async resendEmail(data: ResendEmailRequest): Promise<void> {
    const user = await this.userService.findUser({
      username: data.username,
      email: data.email,
    });

    if (!user) {
      throw this.exceptionFactory.createUserNotFoundException();
    }

    switch (data.type) {
      case EmailType.RESET_PASSWORD: {
        if (!user.isEmailVerified) {
          throw this.exceptionFactory.createEmailNotVerfiedException();
        }

        user.forgotPasswordToken = crypto.randomBytes(64).toString('hex');
        user.forgotPasswordExpired = new Date(Date.now() + RESET_PASSWORD_TIME);

        break;
      }
      case EmailType.VERIFY_REGISTER: {
        if (user.isEmailVerified) {
          throw this.exceptionFactory.createEmailWasVerifiedException();
        }

        if (user.emailVerfiedExpired < new Date()) {
          throw new UnauthorizedException(this.i18n.t('auth.expired_token'));
        }

        user.emailVerfiedToken = crypto.randomBytes(64).toString('hex');
        user.emailVerfiedExpired = new Date(Date.now() + VERIFY_REGISTER_TIME);

        break;
      }
      default:
        break;
    }

    const updatedUser = await this.userService.updateUser(user);

    switch (data.type) {
      case EmailType.RESET_PASSWORD: {
        this.queueService.addJobToResetPassword({
          token: updatedUser.forgotPasswordToken,
          email: updatedUser.email,
          fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
          subject: 'Reset your password',
        });
        break;
      }
      case EmailType.VERIFY_REGISTER: {
        this.queueService.addJobToVerifyEmailQueue({
          token: updatedUser.emailVerfiedToken,
          email: updatedUser.email,
          fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
          subject: 'Verify your email',
        });
        break;
      }
      default:
        break;
    }
  }

  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    const user = await this.userService.findUser({ emailVerfiedToken: token });

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('auth.invalid_token'));
    }

    if (user.isEmailVerified) {
      throw this.exceptionFactory.createEmailWasVerifiedException();
    }

    if (user.emailVerfiedExpired < new Date()) {
      throw new UnauthorizedException(this.i18n.t('auth.expired_token'));
    }

    const sessionId: string = uuidv1();
    const [{ accessToken, refreshToken }, userUpdated] = await Promise.all([
      this.createTokens({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        sessionId,
      }),
      this.userService.updateUser({
        ...user,
        emailVerfiedExpired: null,
        emailVerfiedToken: null,
        isEmailVerified: true,
      }),
    ]);

    await this.refreshTokenRepostiory.save({
      user: userUpdated,
      sessionId,
      refreshToken,
      expired: this.getRefreshTokenExpiredDate(),
    });

    const userReturn = this.classMapper.map(
      userUpdated,
      User,
      CreateUserResponse,
    );

    return {
      ...userReturn,
      accessToken,
      refreshToken,
    };
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
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY_ACCESS_JWT'),
          expiresIn: ACCESS_TOKEN_EXPIRED_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
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
