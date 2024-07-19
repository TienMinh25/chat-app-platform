import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistException extends ConflictException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
