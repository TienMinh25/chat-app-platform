import { Global, Module } from '@nestjs/common';
import { UserExceptionFactory } from './user.exception.factory';

@Global()
@Module({
  providers: [UserExceptionFactory],
  exports: [UserExceptionFactory],
})
export class ExceptionFactoryModule {}
