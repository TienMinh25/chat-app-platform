import { CustomI18nService } from '@modules/custom-i18n/custom-i18n.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ConversationExceptionFactory {
  constructor(private readonly i18n: CustomI18nService) {}

  createConversationCreatedWithYourselfException(error?: string) {
    const message = this.i18n.t(
      'conversation.errors.cannot_create_conversation_with_yourself',
    );

    return new BadRequestException(message, error);
  }
}
