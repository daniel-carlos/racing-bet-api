import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  speed: number;

  @IsNumber()
  acceleration: number;

  @IsNumber()
  steering: number;
}
