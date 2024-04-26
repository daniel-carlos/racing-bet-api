import { PrismaClient } from '@prisma/client';
import { cars, pilots } from './initial-data';
import { fakeUsers } from './fake-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating initial data');

  await prisma.car.createMany({ data: cars });
  console.log('Created Cars: success');

  await prisma.pilot.createMany({ data: pilots });
  console.log('Created Pilotss: success');

  if (process.env.DATABASE_FAKE_POPULATION) {
    await prisma.user.createMany({ data: fakeUsers });
    console.log('Created Fake Population: success');
  }
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
