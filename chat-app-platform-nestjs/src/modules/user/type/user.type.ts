import { User } from '../user.entity';
import { ICreateUser } from './create-user.type';

export interface IUserService {
  create(createUser: ICreateUser): Promise<User>;
  update(user: User): Promise<User>;
  findOne(params: FindUserParams): Promise<User>;
}

export type FindUserParams = Partial<User>;
