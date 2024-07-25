import { CreateUserRequest } from '@modules/user/dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordRequest extends PickType(CreateUserRequest, [
  'password',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  forgotPasswordToken: string;
}
