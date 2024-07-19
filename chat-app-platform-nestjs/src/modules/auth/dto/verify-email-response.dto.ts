import { CreateUserResponse } from '@modules/user/dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class VerifyEmailResponse extends PickType(CreateUserResponse, [
  'email',
  'firstName',
  'id',
  'isEmailVerified',
  'lastName',
  'username',
]) {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
