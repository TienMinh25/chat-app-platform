import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import {
  ResetPasswordMailType,
  MailType,
  NotificationPasswordChangeSuccess,
} from '../mail/type';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('emailSending') private readonly emailQueue: Queue,
  ) {}

  public async addJobToVerifyEmailQueue(data: MailType) {
    await this.emailQueue.add('sendVerifyEmail', data);
  }

  public async addJobToResetPassword(data: ResetPasswordMailType) {
    await this.emailQueue.add('resetPasswordEmail', data);
  }

  public async addJobNotificationChangePasswordSuccess(
    data: NotificationPasswordChangeSuccess,
  ) {
    await this.emailQueue.add('changePasswordSuccess', data);
  }
}
