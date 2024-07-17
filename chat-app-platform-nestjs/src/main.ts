import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { configSwagger } from './api-docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  configSwagger(app);
  app.enableCors();
  const { PORT } = process.env;

  await app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
}

bootstrap();
