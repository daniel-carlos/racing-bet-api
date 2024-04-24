import { Injectable } from '@nestjs/common';
import { CreateRaceDTO, SetPilotsToRaceDTO } from './dto/create-race.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.race.findMany({
      include: {
        RacePilot: true,
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

  async createFull(data: CreateRaceDTO) {
    return { data };
  }
}
