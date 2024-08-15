import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { configSwagger } from './api-docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, CLIENT_BASE_URL } = process.env;
  app.enableCors({ origin: [CLIENT_BASE_URL] });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  configSwagger(app);

  await app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
}

bootstrap();
