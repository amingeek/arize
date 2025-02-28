import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعال کردن CORS
  app.enableCors({
    origin: "http://localhost:3000", // آدرس فرانت‌اند (Next.js)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  await app.listen(3001); // یا هر پورتی که برای API استفاده می‌کنی
}
bootstrap();
