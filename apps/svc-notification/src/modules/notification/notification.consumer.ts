import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import {
  TRANSFER_COMPLETED_EVENT,
  TRANSFER_FAILED_EVENT,
  TRANSFER_REQUESTED_EVENT,
  USER_UPDATED_EVENT,
} from '@/queue/queues';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationConsumer {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(USER_UPDATED_EVENT, Transport.RMQ)
  async userUpdated(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: USER_UPDATED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }

  @EventPattern(TRANSFER_REQUESTED_EVENT, Transport.RMQ)
  async transferRequested(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_REQUESTED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }

  @EventPattern(TRANSFER_COMPLETED_EVENT, Transport.RMQ)
  async transferCompleted(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_COMPLETED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }

  @EventPattern(TRANSFER_FAILED_EVENT, Transport.RMQ)
  async transferFailed(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_FAILED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }
}
