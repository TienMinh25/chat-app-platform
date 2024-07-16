import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
