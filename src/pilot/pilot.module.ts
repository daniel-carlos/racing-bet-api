import { Module } from '@nestjs/common';
import { PilotController } from './pilot.controller';

@Module({
  imports: [],
  controllers: [PilotController],
  providers: [],
  exports: [],
})
export class PilotModule {}
