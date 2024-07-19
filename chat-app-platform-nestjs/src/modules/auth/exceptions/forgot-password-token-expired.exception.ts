import { NotAcceptableException } from '@nestjs/common';

export class ForgotPasswordTokenExpired extends NotAcceptableException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
