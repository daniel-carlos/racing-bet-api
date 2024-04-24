import { Module } from '@nestjs/common';
import { PilotController } from './pilot.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PilotService } from './pilot-service';

@Module({
  imports: [PrismaModule],
  controllers: [PilotController],
  providers: [PilotService],
  exports: [],
})
export class PilotModule {}
