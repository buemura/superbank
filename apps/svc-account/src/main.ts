/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap();
