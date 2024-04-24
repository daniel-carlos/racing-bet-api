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
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';
import { PatchCarDTO } from './dto/patch-car.dto';
import { CarService } from './dto/car.service';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateCarDTO) {
    return this.carService.create(data);
  }

  @Get()
  async list() {
    return this.carService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.carService.show(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateCarDTO) {
    return this.carService.update(id, data);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', ParseIntPipe) id, @Body() data: PatchCarDTO) {
    return this.carService.patch(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.carService.delete(id);
  }
}
