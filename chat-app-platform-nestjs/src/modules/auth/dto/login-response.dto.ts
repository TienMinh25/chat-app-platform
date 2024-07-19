import { PickType } from '@nestjs/swagger';
import { VerifyEmailResponse } from './verify-email-response.dto';

export class LoginResponse extends PickType(VerifyEmailResponse, [
  'accessToken',
  'email',
  'firstName',
  'id',
  'lastName',
  'refreshToken',
  'username',
]) {}
