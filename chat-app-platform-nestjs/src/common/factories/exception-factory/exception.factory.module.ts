import { Global, Module } from '@nestjs/common';
import { AuthExceptionFactory } from './auth.exception.factory';
import { UserExceptionFactory } from './user.exception.factory';
import { BlacklistExceptionFactory } from './black-list.exception.factory';

@Global()
@Module({
  providers: [
    UserExceptionFactory,
    AuthExceptionFactory,
    BlacklistExceptionFactory,
  ],
  exports: [
    UserExceptionFactory,
    AuthExceptionFactory,
    BlacklistExceptionFactory,
  ],
})
export class ExceptionFactoryModule {}
