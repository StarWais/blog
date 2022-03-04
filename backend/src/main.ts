import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000,
      maxFiles: 10,
    }),
  );
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
