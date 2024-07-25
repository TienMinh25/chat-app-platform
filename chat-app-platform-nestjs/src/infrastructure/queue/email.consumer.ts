import { ISendMailOptions } from '@nestjs-modules/mailer';
import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { MailService } from '../mail/mail.service';
import {
  MailType,
  NotificationPasswordChangeSuccess,
  ResetPasswordMailType,
} from '../mail/type';

@Processor('emailSending')
export class MailConsumer {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Process('sendVerifyEmail')
  public async sendMailVerify(job: Job<MailType>) {
    const { email, token, fullName, subject } = job.data;

    const data: ISendMailOptions = {
      to: email,
      subject: subject,
      template: 'verify_email',
      context: {
        fullName,
        url: `${this.configService.get('CLIENT_BASE_URL')}/verify-email?token=${token}`,
      },
    };

    await this.mailService.sendMail(data);
  }

  @Process('resetPasswordEmail')
  public async sendMailToResetPassword(job: Job<ResetPasswordMailType>) {
    const { email, token, fullName, subject } = job.data;

    const data: ISendMailOptions = {
      to: email,
      subject: subject,
      template: 'reset_password',
      context: {
        fullName,
        url: `${this.configService.get('CLIENT_BASE_URL')}/reset-password?token=${token}`,
      },
    };

    await this.mailService.sendMail(data);
  }

  @Process('changePasswordSuccess')
  public async sendMailToNofifyChangePasswordSuccess(
    job: Job<NotificationPasswordChangeSuccess>,
  ) {
    const { email, fullName } = job.data;

    const data: ISendMailOptions = {
      to: email,
      subject: 'Change password successful!',
      template: 'notification_change_password_success',
      context: {
        fullName,
      },
    };

    await this.mailService.sendMail(data);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    job.remove();
  }

  @OnQueueError()
  onError(job: Job) {
    job.remove();
  }
}
