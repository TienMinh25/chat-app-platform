import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
