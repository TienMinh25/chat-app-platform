import { NotAcceptableException } from '@nestjs/common';

export class EmailNotVerified extends NotAcceptableException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
