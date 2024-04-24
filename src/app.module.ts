import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './useCases/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PilotModule } from './useCases/pilot/pilot.module';
import { CarModule } from './useCases/car/car.module';

@Module({
  imports: [UserModule, PrismaModule, PilotModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
