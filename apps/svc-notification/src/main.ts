import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { queues } from '@/queue/queues';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function connectMicroservice(app: INestApplication) {
  for (const q of queues) {
    app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.RMQ,
        options: {
          urls: [q.url],
          queue: q.queueName,
          queueOptions: q.queueOptions,
          noAck: false,
          prefetchCount: 10,
          // Wrap non-Nest messages so @EventPattern('<queueName>') works
          deserializer: {
            deserialize(message: any) {
              // message is the amqplib delivery { content, fields, properties, ... }
              const raw =
                message?.content instanceof Buffer
                  ? message.content.toString()
                  : (message?.content ?? message);

              let parsed: any;
              try {
                parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
              } catch {
                parsed = raw;
              }

              // If publisher already sent a Nest packet, pass it through
              if (
                parsed &&
                typeof parsed === 'object' &&
                'pattern' in parsed &&
                'data' in parsed
              ) {
                return parsed;
              }

              // Otherwise, force pattern to the queue name and data to parsed payload
              return {
                pattern: q.queueName, // <-- string pattern expected by @EventPattern
                data: parsed,
              };
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
