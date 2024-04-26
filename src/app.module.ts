import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './useCases/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DriverModule } from './useCases/driver/driver.module';
import { CarModule } from './useCases/car/car.module';
import { RaceModule } from './useCases/race/race.module';

@Module({
  imports: [PrismaModule, UserModule, DriverModule, CarModule, RaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
