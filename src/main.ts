import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NODE_ENV } from './app/constants';
import { setupSwagger } from './util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<number>('PORT');

  app.setGlobalPrefix(`api/${process.env.API_VERSION}`);
  app.enableCors({ credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Open API
  if (configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT) {
    setupSwagger(app);
  }

  await app.listen(PORT);
}
bootstrap();
