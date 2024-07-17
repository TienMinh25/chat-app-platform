import { ICreateUser } from '../user/type';

export interface IAuthSerivce {
  validateUser();
  createUser(createUser: ICreateUser);
}
