import { MapInterceptor } from '@automapper/nestjs';
import { Auth } from '@common/decorators';
import { UserContext } from '@common/decorators/user-context.decorator';
import { User } from '@common/typeorm';
import { IUserContext } from '@common/types';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserResponse,
} from '../user/dto';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  RequestResetPasswordRequest,
  ResendEmailRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './dto';
import {
  AccessTokenGuard,
  BlacklistGuard,
  LocalGuard,
  RefreshTokenGuard,
} from './guards';
import { UserService } from '@modules/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  @ApiBody({
    type: LoginRequest,
  })
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

  @ApiOkResponse({ type: VerifyEmailResponse })
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  verifyEmail(@Body() data: VerifyEmailRequest) {
    return this.authService.verifyEmail(data.emailToken);
  }

  @ApiOkResponse({ type: UserResponse })
  @UseInterceptors(
    MapInterceptor(User, UserResponse, {
      mapperName: 'classes',
    }),
  )
  @Get('status')
  @UseGuards(AccessTokenGuard)
  status(@UserContext() userCtx: IUserContext) {
    return this.userService.findOne({ id: userCtx.id });
  }
}
