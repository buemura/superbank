import { Module } from '@nestjs/common';

import { QUEUE_SERVICE, QueueService } from './queue.service';

@Module({
  providers: [
    {
      provide: QUEUE_SERVICE,
      useFactory: async () => {
        const rabbitmq = new QueueService();
        await rabbitmq.connect('amqp://guest:guest@localhost:5672/');
        return rabbitmq;
      },
    },
  ],
  exports: [QUEUE_SERVICE],
})
export class QueueModule {}
