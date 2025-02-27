import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 86400, // زمان انقضای پیش‌فرض (ثانیه)
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}