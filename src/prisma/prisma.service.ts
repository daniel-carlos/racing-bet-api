import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('\n\nVai dar certo!\n\n');
    await this.$connect();
  }
  async enableSutdownHooks(app: INestApplication) {
    console.log('\n\nEu vou caiiiiiir!\n\n');
    await app.close();
  }
}
