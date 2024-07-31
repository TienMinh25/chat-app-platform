import { MapInterceptor } from '@automapper/nestjs';
import { Auth } from '@common/decorators';
import { UserContext } from '@common/decorators/user-context.decorator';
import { User } from '@common/typeorm';
import { IUserContext } from '@common/types';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, CreateUserResponse } from '../user/dto';
import { AuthService } from './auth.service';
import {
  LoginResponse,
  RequestResetPasswordRequest,
  ResendEmailRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from './dto';
import {
  AccessTokenGuard,
  BlacklistGuard,
  LocalGuard,
  RefreshTokenGuard,
} from './guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: CreateUserResponse })
  @UseInterceptors(
    MapInterceptor(User, CreateUserResponse, {
      mapperName: 'classes',
    }),
  )
  @Post('register')
  register(@Body() createUser: CreateUserRequest): Promise<CreateUserResponse> {
    return this.authService.register(createUser);
  }

  @ApiOkResponse({ type: LoginResponse })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  login(@UserContext() userCtx: IUserContext): Promise<LoginResponse> {
    return this.authService.login(userCtx);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('resend-verify-email')
  async resendEmailVerify(@Body() data: ResendEmailRequest) {
    await this.authService.resendEmailVerify(data);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, BlacklistGuard)
  @Post('logout')
  logout(@UserContext() userCtx: IUserContext) {
    this.authService.logout(userCtx);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordRequest): Promise<void> {
    return this.authService.resetPassword(data);
  }

  @ApiOkResponse()
  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  requestResetPassword(
    @Body() data: RequestResetPasswordRequest,
  ): Promise<void> {
    return this.authService.requestResetPassword(data);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@UserContext() userCtx: IUserContext) {
    return this.authService.refreshToken(userCtx);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  verifyEmail(@Body() data: VerifyEmailRequest): Promise<void> {
    return this.authService.verifyEmail(data.emailToken);
  }
}
