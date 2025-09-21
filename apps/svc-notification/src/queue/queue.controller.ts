import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { QUEUE_SERVICE, QueueService } from './queue.service';
import { EVENTS_EXCHANGE } from './queues';

class PublishMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  routingKey: string;

  @ApiProperty()
  @IsNotEmpty()
  message: any;
}

@Controller('queue')
export class QueueController {
  constructor(
    @Inject(QUEUE_SERVICE)
    private readonly queueService: QueueService,
  ) {}

  @Post('publish')
  publishMessage(@Body() body: PublishMessageDto): void {
    this.queueService.publishMessage(
      EVENTS_EXCHANGE,
      body.routingKey,
      body.message,
    );
  }
}
