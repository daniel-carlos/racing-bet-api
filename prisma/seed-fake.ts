import { PrismaClient } from '@prisma/client';
import { fakeUsers } from './fake-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data: fakeUsers });
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
