import { IsDateString, IsInt } from 'class-validator';

export class CreateRaceDTO {
  @IsDateString()
  date: string;

  @IsInt()
  raceTime: number;

  @IsInt()
  laps: number;
}

export class SetDriversToRaceDTO {
  @IsInt()
  raceId: number;

  @IsInt({ each: true })
  driverIds: number[];

  @IsInt({ each: true })
  carIds: number[];
}

export class CreateRaceWithDriversDTO {
  @IsDateString()
  date: string;

  @IsInt({ each: true })
  driverIds: number[];

  @IsInt({ each: true })
  carIds: number[];
}
