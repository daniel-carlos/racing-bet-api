import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateRaceDTO,
  CreateRaceFullDTO,
  SetPilotsToRaceDTO,
} from './dto/create-race.dto';
import { RaceService } from './race.service';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createSimple(@Body() data: CreateRaceDTO) {
    return this.raceService.createSimple(data);
  }

  @Post('/full')
  @UsePipes(new ValidationPipe())
  async createFull(@Body() data: CreateRaceFullDTO) {
    return { data };
  }

  @Post('/set-pilots')
  @UsePipes(new ValidationPipe())
  async setPilots(@Body() data: SetPilotsToRaceDTO) {
    return this.raceService.SetPilots(data);
  }
}
