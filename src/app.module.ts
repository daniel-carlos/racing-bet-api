import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './useCases/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DriverModule } from './useCases/driver/driver.module';
import { CarModule } from './useCases/car/car.module';
import { RaceModule } from './useCases/race/race.module';
import { LoggerMiddleware } from './middlewared/logger/loggerMiddleware';

@Module({
  imports: [PrismaModule, UserModule, DriverModule, CarModule, RaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
