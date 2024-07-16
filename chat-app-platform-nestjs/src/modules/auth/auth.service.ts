import { Injectable } from '@nestjs/common';
import { IAuthSerivce } from './auth.type';

@Injectable()
export class AuthService implements IAuthSerivce {
  validateUser() {}
}
