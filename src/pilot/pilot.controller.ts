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
import { CreateCarDTO } from 'src/car/dto/create-car.dto';
import { PatchCarDTO } from 'src/car/dto/patch-car.dto';
import { UpdateCarDTO } from 'src/car/dto/update-car.dto';
import { PilotService } from './pilot-service';

@Controller('pilots')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateCarDTO) {
    return this.pilotService.create(data);
  }

  @Get()
  async list() {
    return this.pilotService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.pilotService.show(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateCarDTO) {
    return this.pilotService.update(id, data);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', ParseIntPipe) id, @Body() data: PatchCarDTO) {
    return this.pilotService.patch(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.pilotService.delete(id);
  }
}
