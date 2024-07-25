import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  username: string;
}
