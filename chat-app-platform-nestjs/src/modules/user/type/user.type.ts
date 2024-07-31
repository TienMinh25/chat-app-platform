import { User } from '../user.entity';
import { ICreateUser } from './create-user.type';

export interface IUserService {
  create(payload: ICreateUser): Promise<User>;
  update(payload: Partial<User>): Promise<User>;
  findOne(params: FindUserParams): Promise<User | null>;
}

export type FindUserParams = Partial<User>;
