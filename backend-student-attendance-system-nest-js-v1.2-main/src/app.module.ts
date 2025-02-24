// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NewPersonController } from './new-person.controller';
import { NewPersonService } from './new-person.service';

@Module({
  imports: [],
  controllers: [UserController, NewPersonController],
  providers: [PrismaService, UserService, NewPersonService], // اضافه کردن NewPersonService به لیست providers
})
export class AppModule {}
