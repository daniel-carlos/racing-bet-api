import { IsInt } from 'class-validator';

export class RemoveDriversFromRaceDTO {
  @IsInt({
    each: true,
  })
  raceDriverIds: number[];
}
