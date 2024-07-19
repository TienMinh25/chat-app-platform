import { IUserContext } from '@common/types';
import { CreateUserResponse } from '@modules/user/dto';
import { ICreateUser } from '../../user/type';
import {
  LoginResponse,
  RefreshTokenResponse,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from '../dto';

export interface IAuthSerivce {
  validateUser(email: string, password: string): Promise<DataToken>;
  register(createUser: ICreateUser): Promise<CreateUserResponse>;
  verifyEmail(token: string): Promise<VerifyEmailResponse>;
  login(userCtx: IUserContext): Promise<LoginResponse>;
  refreshToken(userCtx: IUserContext): Promise<RefreshTokenResponse>;
  logout(userCtx: IUserContext): Promise<void>;
  requestResetPassword(data: RequestResetPasswordRequest);
  resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse>;
}

export interface DataToken {
  id: string;
  sessionId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
