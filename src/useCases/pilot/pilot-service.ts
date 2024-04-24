import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePilotDTO } from './dto/create-pilot.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePilotDTO } from './dto/update-pilot.dto';
import { PatchPilotDTO } from './dto/patch-pilot-dto';

@Injectable()
export class PilotService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreatePilotDTO) {
    return this.prisma.pilot.create({
      data,
    });
  }

  async list() {
    return this.prisma.pilot.findMany();
  }

  async show(id: number) {
    return this.prisma.pilot.findFirst({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePilotDTO) {
    return this.prisma.pilot.update({
      where: { id },
      data,
    });
  }

  async patch(id: number, data: PatchPilotDTO) {
    return this.prisma.pilot.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.pilot.delete({
      where: { id },
    });
  }
}
