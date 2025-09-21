import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import { EventType } from '@/enums/event-type.enum';
import {
  TRANSFER_COMPLETED_EVENT,
  TRANSFER_FAILED_EVENT,
  TRANSFER_REQUESTED_EVENT,
} from '@/queue/queues';
import { UserService } from '../user/user.service';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationConsumer {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @EventPattern(TRANSFER_REQUESTED_EVENT, Transport.RMQ)
  async transferRequested(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_REQUESTED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      channel.ack(message);
      return;
    }

    await this.notificationService.processNotification({
      userId: user.userId,
      userPreferredChannel: user.preferredChannel,
      eventType: EventType.TRANSFER_REQUESTED,
    });

    channel.ack(message);
  }

  @EventPattern(TRANSFER_COMPLETED_EVENT, Transport.RMQ)
  async transferCompleted(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_COMPLETED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      channel.ack(message);
      return;
    }

    await this.notificationService.processNotification({
      userId: user.userId,
      userPreferredChannel: user.preferredChannel,
      eventType: EventType.TRANSFER_COMPLETED,
    });

    channel.ack(message);
  }

  @EventPattern(TRANSFER_FAILED_EVENT, Transport.RMQ)
  async transferFailed(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: TRANSFER_FAILED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      channel.ack(message);
      return;
    }

    await this.notificationService.processNotification({
      userId: user.userId,
      userPreferredChannel: user.preferredChannel,
      eventType: EventType.TRANSFER_FAILED,
    });

    channel.ack(message);
  }
}
