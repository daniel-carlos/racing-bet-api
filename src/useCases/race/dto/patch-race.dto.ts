import { PartialType } from '@nestjs/mapped-types';
import { UpdateRaceDTO } from './update-race.sdto';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { RaceFinalStatus } from '@prisma/client';

export class PatchRaceDTO extends PartialType(UpdateRaceDTO) {}

export class PatchRaceResultDTO {
  @IsInt()
  id: number;
  @IsEnum(RaceFinalStatus)
  finalStatus: RaceFinalStatus;
  @IsNumber()
  finalTime: number;
  @IsInt()
  finalPlace: number;
}
export class PatchRaceResultsManyDTO {
  @IsArray()
  @ValidateNested({ each: true })
  raceDrivers: PatchRaceResultDTO[];
}
