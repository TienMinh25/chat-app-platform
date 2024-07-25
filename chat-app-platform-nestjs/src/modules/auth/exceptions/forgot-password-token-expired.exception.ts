import { ConflictException } from '@nestjs/common';

export class ForgotPasswordTokenExpired extends ConflictException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
