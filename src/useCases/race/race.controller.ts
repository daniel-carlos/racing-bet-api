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
import {
  CreateRaceDTO,
  CreateRaceWithDriversDTO,
  SetDriversToRaceDTO,
} from './dto/create-race.dto';
import { RaceService } from './race.service';
import { UpdateRaceDTO } from './dto/update-race.sdto';
import { PatchRaceDTO } from './dto/patch-race.dto';
import { RemoveDriversFromRaceDTO } from './dto/remove-drivers.dto';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createSimple(@Body() data: CreateRaceDTO) {
    return this.raceService.createSimple(data);
  }

  @Post('/with-drivers')
  @UsePipes(new ValidationPipe())
  async createWithDrivers(@Body() data: CreateRaceWithDriversDTO) {
    return this.raceService.createWithDrivers(data);
  }

  @Post('/set-drivers')
  @UsePipes(new ValidationPipe())
  async setDrivers(@Body() data: SetDriversToRaceDTO) {
    return this.raceService.SetDrivers(data);
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

  @Post('/remove-drivers/:id')
  @UsePipes(new ValidationPipe())
  async removeDrivers(
    @Param('id', ParseIntPipe) id,
    @Body() data: RemoveDriversFromRaceDTO,
  ) {
    return this.raceService.removeDrivers(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.raceService.delete(id);
  }
}
