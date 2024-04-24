import { IsDateString, IsInt } from 'class-validator';

export class CreateRaceDTO {
  @IsDateString()
  date: string;
}

export class CreateRaceFullDTO {
  @IsDateString()
  date: string;

  @IsInt({ each: true })
  pilots: number[];
}

export class SetPilotsToRaceDTO {
  @IsInt()
  raceId: number;

  @IsInt({ each: true })
  pilotIds: number[];

  @IsInt({ each: true })
  carIds: number[];
}
