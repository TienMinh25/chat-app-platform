import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '@common/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserRequest, CreateUserResponse } from '../user/dto';
import { UserService } from '../user/user.service';
import { IAuthSerivce } from './type';

@Injectable()
export class AuthService implements IAuthSerivce {
  constructor(
    private readonly userService: UserService,
    @InjectMapper('classes') private readonly classMapper: Mapper,
  ) {}

  validateUser() {}

  async createUser(createUser: CreateUserRequest): Promise<CreateUserResponse> {
    const newUser = await this.userService.createUser(createUser);

    return this.classMapper.map(newUser, User, CreateUserResponse);
  }
}
