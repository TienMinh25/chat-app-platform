import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CustomI18nService {
  constructor(private readonly i18n: I18nService) {}

  public t(key: string, options?: Record<string, any>) {
    const lang = I18nContext.current()?.lang || 'en';
    return this.i18n.translate(key, { lang, ...options }) as string;
  }
}
