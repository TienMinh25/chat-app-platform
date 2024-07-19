import { BadRequestException } from '@nestjs/common';

export class EmailWasVerifiedException extends BadRequestException {
  constructor(message: string, error?: string) {
    super(message, error);
  }
}
