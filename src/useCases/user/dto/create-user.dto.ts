import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
