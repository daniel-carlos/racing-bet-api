import { IsString } from 'class-validator';

export class CreatePilotDTO {
  @IsString()
  name: string;
  modelURL?: string;
}
