import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { Injectable } from '@nestjs/common';
import { UpdateDriverDTO } from './dto/update-driver.dto';
import { PatchDriverDTO } from './dto/patch-driver-dto';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateDriverDTO) {
    return this.prisma.driver.create({
      data,
    });
  }

  async list() {
    return this.prisma.driver.findMany();
  }

  async show(id: number) {
    return this.prisma.driver.findFirst({
      where: { id },
    });
  }

  async update(id: number, data: UpdateDriverDTO) {
    return this.prisma.driver.update({
      where: { id },
      data,
    });
  }

  async patch(id: number, data: PatchDriverDTO) {
    return this.prisma.driver.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.driver.delete({
      where: { id },
    });
  }
}
