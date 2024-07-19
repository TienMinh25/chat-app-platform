import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @AutoMap()
  username: string;

  @AutoMap()
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  isEmailVerified: boolean;
}
