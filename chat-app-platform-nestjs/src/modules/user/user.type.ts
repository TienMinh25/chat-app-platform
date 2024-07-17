import { ICreateUser } from './type/create-user.type';

export interface IUserService {
  createUser(createUser: ICreateUser);
}
