import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Employee Logs')
    .setDescription('The employee logs API description')
    .setVersion('1.0')
    .addTag('logs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  await app.listen(5000);
}

bootstrap();
