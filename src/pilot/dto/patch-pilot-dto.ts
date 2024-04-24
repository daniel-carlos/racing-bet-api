import { PartialType } from '@nestjs/mapped-types';
import { UpdatePilotDTO } from './update-pilot.dto';

export class PatchPilotDTO extends PartialType(UpdatePilotDTO) {}
