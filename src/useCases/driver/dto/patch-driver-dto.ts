import { PartialType } from '@nestjs/mapped-types';
import { UpdateDriverDTO } from './update-driver.dto';

export class PatchDriverDTO extends PartialType(UpdateDriverDTO) {}
