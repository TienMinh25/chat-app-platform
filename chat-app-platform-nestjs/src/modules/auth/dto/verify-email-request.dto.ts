import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emailToken: string;
}
