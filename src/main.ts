import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desinger-trellis-BE')
    .setDescription('The sign-up login form')
    .setVersion('1.0')
    .addTag('Desinger-trellis-BE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use the Express instance to handle the root route with type safety
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.redirect('/api');
  });

  await app.listen(3000);
}
bootstrap();