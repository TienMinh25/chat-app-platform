import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, CreateUserResponse } from '../user/dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: CreateUserResponse })
  @Post('register')
  registerUser(
    @Body() createUser: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return this.authService.createUser(createUser);
  }

  @Post('login')
  login(@Body() userLogin: LoginRequest) {
    
  }

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
