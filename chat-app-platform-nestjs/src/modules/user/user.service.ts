import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashRawText } from '../../utils';
import { CreateUserRequest } from './dto';
import { User } from './user.entity';
import { IUserService } from './type';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly i18n: CustomI18nService,
  ) {}

  async createUser(createUser: CreateUserRequest): Promise<User> {
    const existsUser = await this.userRepository.findOneBy({
      email: createUser.email,
    });

    if (existsUser) {
      throw new ConflictException(this.i18n.t('user.already_exists'));
    }

    const hashedPassword = await hashRawText(createUser.password);

    const user = this.userRepository.create({
      email: createUser.email,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      password: hashedPassword,
    });

    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
