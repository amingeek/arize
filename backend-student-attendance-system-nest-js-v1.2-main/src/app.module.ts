// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NewPersonController } from './new-person.controller';
import { NewPersonService } from './new-person.service';
import { AppController } from './app.controller';
import { AvalaiService } from './services/avalai.service';
import { SessionService } from './services/session.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(),
    RedisModule,],
  controllers: [UserController, NewPersonController, AppController],
  providers: [PrismaService, UserService, NewPersonService, AvalaiService,
    SessionService], // اضافه کردن NewPersonService به لیست providers
})
export class AppModule {}
