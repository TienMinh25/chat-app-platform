import { User } from '../user.entity';
import { ICreateUser } from './create-user.type';

export interface IUserService {
  createUser(createUser: ICreateUser): Promise<User>;
  updateUser(user: User): Promise<User>;
  findUser(params: FindUserParams): Promise<User>;
}

export type FindUserParams = Partial<User>;
