import { Body, Controller, Inject, Post } from '@nestjs/common';

import { QUEUE_SERVICE, QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueService,
  ) {}

  @Post()
  publishMessage(
    @Body() body: { exchange: string; routingKey: string; message: any },
  ): void {
    this.queueService.publishMessage(
      body.exchange,
      body.routingKey,
      body.message,
    );
  }
}
