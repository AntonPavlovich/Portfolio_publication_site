import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExeptionFilter } from './filters/not-found-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new NotFoundExeptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen( parseInt(process.env.APP_PORT, 10) || 5000 );
}
bootstrap();
