import { IsDateString, IsInt } from 'class-validator';

export class CreateRaceDTO {
  @IsDateString()
  date: string;
}

export class SetPilotsToRaceDTO {
  @IsInt()
  raceId: number;

  @IsInt({ each: true })
  pilotIds: number[];

  @IsInt({ each: true })
  carIds: number[];
}

export class CreateRaceWithPilotsDTO {
  @IsDateString()
  date: string;

  @IsInt({ each: true })
  pilotIds: number[];

  @IsInt({ each: true })
  carIds: number[];
}
