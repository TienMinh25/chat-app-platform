import {
  EmailNotVerified,
  EmailWasVerifiedException,
  ForgotPasswordTokenExpired,
  UserAlreadyExistException,
  UserNotFoundException,
} from '@modules/auth/exceptions';
import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionFactory {
  constructor(private readonly i18n: CustomI18nService) {}

  createUserAlreadyExistException(error?: string): UserAlreadyExistException {
    const message = this.i18n.t('auth.user.already_exists') as string;

    return new UserAlreadyExistException(message, error);
  }

  createUserNotFoundException(error?: string): UserAlreadyExistException {
    const message = this.i18n.t('auth.user.not_found') as string;

    return new UserNotFoundException(message, error);
  }

  createEmailNotVerfiedException(error?: string): EmailNotVerified {
    const message = this.i18n.t('auth.user.email_not_verified') as string;

    return new EmailNotVerified(message, error);
  }

  createEmailWasVerifiedException(error?: string): EmailWasVerifiedException {
    const message = this.i18n.t('auth.user.email_was_verified') as string;

    return new EmailNotVerified(message, error);
  }

  createForgotPasswordTokenExpiredException(
    error?: string,
  ): ForgotPasswordTokenExpired {
    const message = this.i18n.t(
      'auth.user.forgot_password_token_expired',
    ) as string;

    return new ForgotPasswordTokenExpired(message, error);
  }
}
