import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: "Name of the user",
    minimum: 4,
  })
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @ApiProperty({
    description: "Username of the user",
    minimum: 4,
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  username: string;

  @ApiProperty({
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
