import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthExceptionFactory {
  constructor(private readonly i18n: CustomI18nService) {}

  createLoginFailedException(error?: string) {
    const message = this.i18n.t('auth.errors.login_failure');

    return new UnauthorizedException(message, error);
  }

  createInvalidRefreshTokenException(error?: string) {
    const message = this.i18n.t('auth.errors.invalid_refresh_token');

    return new UnauthorizedException(message, error);
  }

  createRefreshTokenNotFoundException(error?: string) {
    const message = this.i18n.t('auth.errors.not_found_refresh_token');

    return new NotFoundException(message, error);
  }

  createExpiredVerifiedEmailToken(error?: string) {
    const message = this.i18n.t('auth.errors.expired_token');

    return new UnauthorizedException(message, error);
  }

  createVerifiedEmailTokenInvalid(error?: string) {
    const message = this.i18n.t('auth.errors.invalid_token');

    return new UnauthorizedException(message, error);
  }
}
