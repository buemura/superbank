import { Injectable } from '@nestjs/common';
import { Channel, ChannelModel, connect } from 'amqplib';

export const QUEUE_SERVICE = 'QUEUE_SERVICE';

export interface IQueueService {
  publishMessage: (
    exchange: string,
    routingKey: string,
    message: unknown,
  ) => void;
}

@Injectable()
export class QueueService implements IQueueService {
  private connection: ChannelModel;
  private channel: Channel;

  async connect(url: string) {
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
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
