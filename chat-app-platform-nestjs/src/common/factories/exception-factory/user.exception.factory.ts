import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserExceptionFactory {
  constructor(private readonly i18n: CustomI18nService) {}

  createUserAlreadyExistException(error?: string) {
    const message = this.i18n.t('user.errors.already_exists');

    return new ConflictException(message, error);
  }

  createUserNotFoundException(error?: string) {
    const message = this.i18n.t('user.errors.not_found');

    return new NotFoundException(message, error);
  }

  createEmailNotVerfiedException(error?: string) {
    const message = this.i18n.t('user.errors.email_not_verified');

    return new ConflictException(message, error);
  }

  createEmailWasVerifiedException(error?: string) {
    const message = this.i18n.t('user.errors.email_was_verified');

    return new ConflictException(message, error);
  }

  createForgotPasswordTokenExpiredException(error?: string) {
    const message = this.i18n.t('user.errors.forgot_password_token_expired');

    return new ConflictException(message, error);
  }
}
