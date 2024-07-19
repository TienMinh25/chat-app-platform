import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
