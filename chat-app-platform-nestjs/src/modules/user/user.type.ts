import { ICreateUser } from './type';

export interface IUserService {
  createUser(createUser: ICreateUser);
}
