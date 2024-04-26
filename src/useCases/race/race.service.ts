import { Injectable } from '@nestjs/common';
import {
  CreateRaceDTO,
  CreateRaceWithDriversDTO,
  SetDriversToRaceDTO,
} from './dto/create-race.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRaceDTO } from './dto/update-race.sdto';
import { PatchRaceDTO } from './dto/patch-race.dto';
import { RemoveDriversFromRaceDTO } from './dto/remove-drivers.dto';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.race.findMany({
      include: {
        RaceDriver: {
          select: { car: true, driver: true },
        },
      },
    });
  }

  async show(id) {
    return this.prisma.race.findUnique({
      where: { id },
      include: {
        RaceDriver: {
          select: { car: true, driver: true, gridPlace: true },
          orderBy: {
            gridPlace: 'asc',
          },
        },
      },
    });
  }

  async createSimple(data: CreateRaceDTO) {
    return this.prisma.race.create({
      data,
    });
  }

  async createWithDrivers(data: CreateRaceWithDriversDTO) {
    const race = await this.prisma.race.create({
      data: {
        date: data.date,
      },
    });

    return this.SetDrivers({
      carIds: data.carIds,
      driverIds: data.driverIds,
      raceId: race.id,
    });
  }

  async SetDrivers({ carIds, driverIds, raceId }: SetDriversToRaceDTO) {
    // Input validation (optional but recommended)
    if (driverIds.length !== carIds.length) {
      throw new Error('driverIds and carIds arrays must have the same length');
    }

    try {
      const createdRaceDrivers = await this.prisma.raceDriver.createMany({
        data: driverIds.map((driverId, index) => ({
          driverId,
          carId: carIds[index],
          raceId,
          position: index + 1, // Set positions in order of creation
        })),
      });

      return createdRaceDrivers;
    } catch (error) {
      // Re-throw the error to propagate it
      return {
        error: true,
        msg: error,
      };
    }
  }

  async update(id: number, data: UpdateRaceDTO) {
    return this.prisma.race.update({
      where: { id },
      data,
    });
  }

  async patch(id: number, data: PatchRaceDTO) {
    return this.prisma.race.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.race.delete({
      where: { id },
      include: {
        RaceDriver: true,
      },
    });
  }

  async removeDrivers({ raceDriverIds }: RemoveDriversFromRaceDTO) {
    return this.prisma.raceDriver.deleteMany({
      where: {
        id: {
          in: raceDriverIds,
        },
      },
    });
  }
}
