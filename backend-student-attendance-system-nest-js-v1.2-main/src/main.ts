//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // **افزایش محدودیت اندازه درخواست:**
  app.use(bodyParser.json({ limit: '10mb' })); // حداکثر 10 مگابایت

  await app.listen(3001, '0.0.0.0');
}

bootstrap();
