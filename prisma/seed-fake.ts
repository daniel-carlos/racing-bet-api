import { PrismaClient } from '@prisma/client';
import { fakeCars, fakePilots, fakeUsers } from './fake-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data: fakeUsers });
  await prisma.car.createMany({ data: fakeCars });
  await prisma.pilot.createMany({ data: fakePilots });
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
