import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmailType } from 'src/infrastructure/mail/type';

export class ResendEmailRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    enum: EmailType,
  })
  @IsEnum(EmailType)
  @IsNotEmpty()
  type: EmailType;
}
