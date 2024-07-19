import { VERIFY_REGISTER_TIME } from '@modules/auth/auth.const';
import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { hashRawText } from '../../utils';
import { CreateUserRequest } from './dto';
import { FindUserParams, IUserService } from './type';
import { User } from './user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly i18n: CustomI18nService,
  ) {}

  async createUser(createUser: CreateUserRequest): Promise<User> {
    const hashedPassword = await hashRawText(createUser.password);
    const user = this.userRepository.create({
      email: createUser.email,
      username: createUser.username,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      emailVerfiedExpired: new Date(Date.now() + VERIFY_REGISTER_TIME),
      emailVerfiedToken: crypto.randomBytes(64).toString('hex'),
      password: hashedPassword,
    });
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  findUser(params: FindUserParams): Promise<User> {
    return this.userRepository.findOne({ where: params });
  }

  updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
