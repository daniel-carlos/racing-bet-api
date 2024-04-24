import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './dto/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
