import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { queues } from '@/queue/constants';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function connectMicroservice(app: INestApplication) {
  for (const queue of queues) {
    app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.RMQ,
        options: {
          urls: [queue.url],
          queue: queue.queueName,
          queueOptions: queue.queueOptions,
          noAssert: false,
          noAck: false,
          persistent: true,
          deserializer: {
            deserialize(value) {
              return { pattern: queue, data: value };
            },
          },
        },
      },
      { inheritAppConfig: true },
    );
  }
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Notification Service API')
    .setDescription('The Notification Service API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
}

async function bootstrap() {
  const host = '0.0.0.0';
  const port = 5004;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);
  await connectMicroservice(app);
  await app.startAllMicroservices();
  await app.listen(port, host);

  console.log(
    `Notification Service Server listening at http://${host}:${port}`,
  );
  console.log(`Notification Service Swagger at  http://${host}:${port}/docs`);
}
bootstrap();
