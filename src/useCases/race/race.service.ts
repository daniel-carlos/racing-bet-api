import { Injectable } from '@nestjs/common';
import { CreateRaceDTO, SetPilotsToRaceDTO } from './dto/create-race.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRaceDTO } from './dto/update-race.sdto';
import { PatchRaceDTO } from './dto/patch-race.dto';
import { RemovePilotsFromRaceDTO } from './dto/remove-pilots.dto';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.race.findMany({
      include: {
        RacePilot: {
          select: { car: true, pilot: true },
        },
      },
    });
  }

  async show(id) {
    return this.prisma.race.findUnique({
      where: { id },
      include: {
        RacePilot: {
          select: { car: true, pilot: true, position: true },
          orderBy: {
            position: 'asc',
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

  async SetPilots({ carIds, pilotIds, raceId }: SetPilotsToRaceDTO) {
    // Input validation (optional but recommended)
    if (pilotIds.length !== carIds.length) {
      throw new Error('pilotIds and carIds arrays must have the same length');
    }

    try {
      const createdRacePilots = await this.prisma.racePilot.createMany({
        data: pilotIds.map((pilotId, index) => ({
          pilotId,
          carId: carIds[index],
          raceId,
          position: index + 1, // Set positions in order of creation
        })),
      });

      return createdRacePilots;
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
        RacePilot: true,
      },
    });
  }

  async removePilots({ racePilotIds }: RemovePilotsFromRaceDTO) {
    return this.prisma.racePilot.deleteMany({
      where: {
        id: {
          in: racePilotIds,
        },
      },
    });
  }
}
