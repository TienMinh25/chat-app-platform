import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Chat app platform API')
    .setDescription('Information about api provided for FE')
    .setVersion('1.0')
    .addSecurity('access_token', {
      type: 'http',
      scheme: 'bearer',
    })
    .addSecurity('refresh_token', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
