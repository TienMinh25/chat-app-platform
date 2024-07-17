import { User } from '@common/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from '../user/dto';
import { UserService } from '../user/user.service';
import { IAuthSerivce } from './auth.type';

@Injectable()
export class AuthService implements IAuthSerivce {
  constructor(private readonly userService: UserService) {}

  validateUser() {}

  createUser(createUser: CreateUserRequest): Promise<User> {
    return this.userService.createUser(createUser);
  }
}
