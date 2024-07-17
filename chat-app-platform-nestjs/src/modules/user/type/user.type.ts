import { ICreateUser } from './create-user.type';

export interface IUserService {
  createUser(createUser: ICreateUser);
}
