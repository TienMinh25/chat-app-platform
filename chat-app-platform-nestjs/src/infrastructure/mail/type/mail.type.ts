export interface MailType {
  token: string;
  fullName: string;
  email: string;
  subject: string;
}

export interface ResetPasswordMailType extends MailType {}

export interface NotificationPasswordChangeSuccess {
  email: string;
  fullName: string;
}