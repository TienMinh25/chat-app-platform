import { ConflictException } from '@nestjs/common';

export class EmailWasVerifiedException extends ConflictException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
