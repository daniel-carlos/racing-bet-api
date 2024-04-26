import { PrismaClient } from '@prisma/client';
import { cars, pilots } from './initial-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.car.createMany({ data: cars });
  await prisma.pilot.createMany({ data: pilots });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
