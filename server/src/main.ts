import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen( parseInt(process.env.APP_PORT, 10) || 5000 );
}
bootstrap();
