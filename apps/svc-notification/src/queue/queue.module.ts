import { Module } from '@nestjs/common';

import { QueueController } from './queue.controller';
import { QUEUE_SERVICE, QueueService } from './queue.service';
import { EVENTS_EXCHANGE, queues } from './queues';

@Module({
  controllers: [QueueController],
  providers: [
    {
      provide: QUEUE_SERVICE,
      useFactory: async () => {
        const rabbit = new QueueService();

        const url = queues[0]?.url ?? 'amqp://guest:guest@localhost:5672';
        await rabbit.connect(url);

        await rabbit.setupBindings(EVENTS_EXCHANGE, queues as any);

        return rabbit;
      },
    },
  ],
  exports: [QUEUE_SERVICE],
})
export class QueueModule {}
