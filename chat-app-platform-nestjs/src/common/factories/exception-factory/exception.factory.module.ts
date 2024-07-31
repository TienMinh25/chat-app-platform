import { Global, Module } from '@nestjs/common';
import { AuthExceptionFactory } from './auth.exception.factory';
import { UserExceptionFactory } from './user.exception.factory';
import { BlacklistExceptionFactory } from './black-list.exception.factory';
import { ConversationExceptionFactory } from './conversation.exception.factory';

@Global()
@Module({
  providers: [
    UserExceptionFactory,
    AuthExceptionFactory,
    BlacklistExceptionFactory,
    ConversationExceptionFactory,
  ],
  exports: [
    UserExceptionFactory,
    AuthExceptionFactory,
    BlacklistExceptionFactory,
    ConversationExceptionFactory,
  ],
})
export class ExceptionFactoryModule {}
