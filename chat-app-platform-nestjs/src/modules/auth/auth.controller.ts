import { Auth } from '@common/decorators';
import { UserContext } from '@common/decorators/user-context.decorator';
import { IUserContext } from '@common/types';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, CreateUserResponse } from '../user/dto';
import { AuthService } from './auth.service';
import {
  LoginResponse,
  RequestResetPasswordRequest,
  ResendEmailRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
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
  @HttpCode(HttpStatus.OK)
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
  @Post('resend-email')
  async resendEmail(@Body() data: ResendEmailRequest) {
    await this.authService.resendEmail(data);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, BlacklistGuard)
  @Post('logout')
  logout(@UserContext() userCtx: IUserContext) {
    this.authService.logout(userCtx);
  }

  @ApiOkResponse({ type: ResetPasswordResponse })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(
    @Body() data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    return this.authService.resetPassword(data);
  }

  @ApiOkResponse()
  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  async requestResetPassword(@Body() data: RequestResetPasswordRequest) {
    await this.authService.requestResetPassword(data);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@UserContext() userCtx: IUserContext) {
    return this.authService.refreshToken(userCtx);
  }

  @ApiOkResponse({ type: VerifyEmailResponse })
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  verifyEmail(@Body() data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return this.authService.verifyEmail(data.emailToken);
  }
}
