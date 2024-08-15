import { VERIFY_REGISTER_TIME } from '@modules/auth/auth.const';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { hashPassword } from '../../utils';
import { CreateUserRequest } from './dto';
import { FindUserParams, IUserService } from './type';
import { User } from './user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserRequest): Promise<User> {
    const hashedPassword = await hashPassword(payload.password);
    const newUser = await this.userRepository.save({
      email: payload.email,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      emailVerfiedExpired: new Date(Date.now() + VERIFY_REGISTER_TIME),
      emailVerfiedToken: crypto.randomBytes(64).toString('hex'),
      password: hashedPassword,
    });

    return newUser;
  }

  findOne(params: FindUserParams): Promise<User | null> {
    return this.userRepository.findOne({ where: params });
  }

  update(payload: Partial<User>): Promise<User> {
    return this.userRepository.save(payload);
  }
}
