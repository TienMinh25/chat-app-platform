import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserRequest } from './create-user-request.dto';

export class CreateUserResponse extends PickType(CreateUserRequest, [
  'email',
  'firstName',
  'lastName',
]) {
  @ApiProperty()
  id: number;
}
