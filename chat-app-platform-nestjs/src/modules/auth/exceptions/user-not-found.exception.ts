import { BadRequestException } from '@nestjs/common';

export class UserNotFoundException extends BadRequestException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
