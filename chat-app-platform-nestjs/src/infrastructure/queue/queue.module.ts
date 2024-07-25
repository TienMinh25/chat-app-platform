import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueService } from './queue.service';
import { MailConsumer } from './email.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      prefix: 'mail',
      name: 'emailSending',
    }),
    ConfigModule,
  ],
  providers: [QueueService, MailConsumer],
  exports: [QueueService],
})
export class QueueModule {}
