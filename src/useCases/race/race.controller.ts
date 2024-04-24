import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRaceDTO, SetPilotsToRaceDTO } from './dto/create-race.dto';
import { RaceService } from './race.service';
import { UpdateRaceDTO } from './dto/update-race.sdto';
import { PatchRaceDTO } from './dto/patch-race.dto';
import { RemovePilotsFromRaceDTO } from './dto/remove-pilots.dto';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createSimple(@Body() data: CreateRaceDTO) {
    return this.raceService.createSimple(data);
  }

  @Post('/set-pilots')
  @UsePipes(new ValidationPipe())
  async setPilots(@Body() data: SetPilotsToRaceDTO) {
    return this.raceService.SetPilots(data);
  }

  @Get()
  async list() {
    return this.raceService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.raceService.show(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateRaceDTO) {
    return this.raceService.update(id, data);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', ParseIntPipe) id, @Body() data: PatchRaceDTO) {
    return this.raceService.patch(id, data);
  }

  @Post('/remove-pilots/:id')
  @UsePipes(new ValidationPipe())
  async removePilots(
    @Param('id', ParseIntPipe) id,
    @Body() data: RemovePilotsFromRaceDTO,
  ) {
    return this.raceService.removePilots(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.raceService.delete(id);
  }
}
