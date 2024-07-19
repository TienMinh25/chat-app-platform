import { IUserContext } from './user.type';

declare module 'express' {
  export interface Request {
    user?: IUserContext;
  }
}
