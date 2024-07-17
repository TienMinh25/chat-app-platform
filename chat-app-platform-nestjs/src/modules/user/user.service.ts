import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './dto';
import { IUserService } from './user.type';

@Injectable()
export class UserService implements IUserService {
  createUser(createUser: CreateUserRequest) {
    new Logger().debug(JSON.stringify(createUser));
  }
}
