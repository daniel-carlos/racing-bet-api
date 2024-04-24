import { IsInt } from 'class-validator';

export class RemovePilotsFromRaceDTO {
  @IsInt({
    each: true,
  })
  racePilotIds: number[];
}
