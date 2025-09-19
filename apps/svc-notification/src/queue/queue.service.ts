import { Injectable } from '@nestjs/common';
import { Channel, connect, Options, ChannelModel } from 'amqplib';

export const QUEUE_SERVICE = 'QUEUE_SERVICE';

export interface IQueueService {
  publishMessage: (
    exchange: string,
    routingKey: string,
    message: unknown,
  ) => void;
}

type QueueDef = {
  url: string;
  queueName: string;
  queueOptions?: Options.AssertQueue;
  // optional: dlqName?: string;
};

@Injectable()
export class QueueService implements IQueueService {
  private connection: ChannelModel;
  private channel: Channel;

  async connect(url: string) {
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
  }

  async assertExchange(
    name: string,
    type: 'topic' | 'direct' | 'fanout' = 'topic',
  ) {
    await this.channel.assertExchange(name, type, { durable: true });
  }

  async assertAndBindQueue(
    queue: string,
    exchange: string,
    routingKey: string,
    options?: Options.AssertQueue,
  ) {
    await this.channel.assertQueue(queue, {
      durable: true,
      ...(options ?? {}),
    });
    await this.channel.bindQueue(queue, exchange, routingKey);
  }

  async setupBindings(exchange: string, queues: QueueDef[]) {
    await this.assertExchange(exchange, 'topic');
    for (const q of queues) {
      await this.assertAndBindQueue(
        q.queueName,
        exchange,
        q.queueName,
        q.queueOptions,
      );
    }
  }

  publishMessage(exchange: string, routingKey: string, message: unknown) {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
    console.log('[PRODUCER] ::', { exchange, routingKey, message });
  }
}
