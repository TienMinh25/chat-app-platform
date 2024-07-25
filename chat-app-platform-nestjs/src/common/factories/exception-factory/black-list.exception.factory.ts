import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistExceptionFactory {
  constructor(private readonly i18n: CustomI18nService) {}

  createAccessTokenInvalidException(error?: string) {
    const message = this.i18n.t('auth.errors.black_list.access_token_invalid');

    return new ForbiddenException(message, error);
  }
}
