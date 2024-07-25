import { ConflictException } from '@nestjs/common';

export class EmailNotVerified extends ConflictException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
