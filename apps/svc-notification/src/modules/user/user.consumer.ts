import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import { USER_CREATED_EVENT } from '@/queue/queues';
import { UserService } from './user.service';

@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) {}

  @EventPattern(USER_CREATED_EVENT, Transport.RMQ)
  async userCreated(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    console.log(`[CONSUMER] ::`, { queue: USER_CREATED_EVENT, payload });
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }
}
