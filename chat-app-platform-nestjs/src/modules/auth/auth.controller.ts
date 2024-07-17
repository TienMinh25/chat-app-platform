import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from '../user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUser: CreateUserRequest) {
    this.authService.createUser(createUser);
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
