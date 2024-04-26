import { IsString } from 'class-validator';

export class CreateDriverDTO {
  @IsString()
  name: string;
  modelURL?: string;
}
