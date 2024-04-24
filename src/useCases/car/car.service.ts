import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';
import { PatchCarDTO } from './dto/patch-car.dto';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCarDTO) {
    return this.prisma.car.create({
      data,
    });
  }

  async list() {
    return this.prisma.car.findMany();
  }

  async show(id: number) {
    return this.prisma.car.findFirst({
      where: { id },
    });
  }

  async update(id: number, data: UpdateCarDTO) {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  async patch(id: number, data: PatchCarDTO) {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}
