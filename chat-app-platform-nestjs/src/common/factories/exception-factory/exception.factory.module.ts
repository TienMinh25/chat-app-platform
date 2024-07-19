import { Global, Module } from '@nestjs/common';
import { ExceptionFactory } from './exception.factory';

@Global()
@Module({
  providers: [ExceptionFactory],
  exports: [ExceptionFactory],
})
export class ExceptionFactoryModule {}
