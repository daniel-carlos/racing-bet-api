import { PartialType } from '@nestjs/mapped-types';
import { UpdateRaceDTO } from './update-race.sdto';

export class PatchRaceDTO extends PartialType(UpdateRaceDTO) {}
