import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AvalaiService } from './services/avalai.service';
import { SessionService } from './services/session.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AvalaiService,
    SessionService
  ],
})
export class AppModule {}