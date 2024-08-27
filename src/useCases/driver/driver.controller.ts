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
import { CreateCarDTO } from 'src/useCases/car/dto/create-car.dto';
import { PatchCarDTO } from 'src/useCases/car/dto/patch-car.dto';
import { UpdateCarDTO } from 'src/useCases/car/dto/update-car.dto';
import { DriverService } from './driver-service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateCarDTO) {
    return this.driverService.create(data);
  }

  @Get()
  async list() {
    return this.driverService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.driverService.show(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateCarDTO) {
    return this.driverService.update(id, data);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', ParseIntPipe) id, @Body() data: PatchCarDTO) {
    return this.driverService.patch(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.driverService.delete(id);
  }
}
