import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { queues } from '@/queue/constants';
import { AppModule } from './app.module';

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

async function bootstrap() {
  const host = '0.0.0.0';
  const port = 5004;

  const app = await NestFactory.create(AppModule);

  await connectMicroservice(app);
  await app.startAllMicroservices();
  await app.listen(port, host);

  console.log(
    `Notification Service Server listening at http://${host}:${port}`,
  );
  // console.log(`Notification Service Swagger at  http://${host}:${port}/docs`);
}
bootstrap();
