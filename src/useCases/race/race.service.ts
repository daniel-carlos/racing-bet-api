import { Injectable } from '@nestjs/common';
import {
  CreateRaceDTO,
  CreateRaceWithDriversDTO,
  SetDriversToRaceDTO,
} from './dto/create-race.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRaceDTO } from './dto/update-race.sdto';
import {
  PatchRaceDTO,
  PatchRaceResultDTO,
  PatchRaceResultsManyDTO,
} from './dto/patch-race.dto';
import { RemoveDriversFromRaceDTO } from './dto/remove-drivers.dto';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.race.findMany({
      include: {
        RaceDriver: {
          select: { car: true, driver: true, id: true },
        },
      },
    });
  }

  async show(id) {
    return this.prisma.race.findUnique({
      where: { id },
      include: {
        RaceDriver: {
          select: { car: true, driver: true, gridPlace: true, id: true },
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

    await this.SetDrivers({
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
          gridPlace: index + 1, // Set places in order of creation
        })),
      });

      return createdRaceDrivers;
    } catch (error) {
      // Re-throw the error to propagate it
      console.log(error);

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

  async patchSetResult(
    raceDriverId: number,
    { finalStatus, finalPlace, finalTime }: PatchRaceResultDTO,
  ) {
    return this.prisma.raceDriver.update({
      where: { id: raceDriverId },
      data: { finalStatus, finalPlace, finalTime },
    });
  }
  async patchResetResult(raceDriverId: number) {
    return this.prisma.raceDriver.update({
      where: { id: raceDriverId },
      data: { finalStatus: 'WAITING', finalPlace: null, finalTime: null },
    });
  }

  async patchSetResultsMany({ raceDrivers }: PatchRaceResultsManyDTO) {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const raceDriver of raceDrivers) {
          await tx.raceDriver.update({
            where: { id: raceDriver.id },
            data: {
              finalStatus: raceDriver.finalStatus,
              finalTime: raceDriver.finalTime,
              finalPlace: raceDriver.finalPlace,
            },
          });
        }
      });
      console.log('RaceDrivers updated successfully!');
    } catch (error) {
      console.error('Error updating RaceDrivers:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
