import { ICreateUser } from '../user/type/create-user.type';

export interface IAuthSerivce {
  validateUser();
  createUser(createUser: ICreateUser);
}
