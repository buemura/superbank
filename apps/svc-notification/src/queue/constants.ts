export const USER_CREATED_EVENT = 'user.created';
export const USER_UPDATED_EVENT = 'user.updated';
export const TRANSFER_REQUESTED_EVENT = 'transfer.requested';
export const TRANSFER_COMPLETED_EVENT = 'transfer.completed';
export const TRANSFER_FAILED_EVENT = 'transfer.failed';

export const queues = [
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'user.created',
    queueOptions: {
      durable: true,
      // arguments: {
      //   'x-dead-letter-routing-key': 'user.created.dlq',
      // },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'user.updated',
    queueOptions: {
      durable: true,
      // arguments: {
      //   'x-dead-letter-routing-key': 'user.updated.dlq',
      // },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'transfer.requested',
    queueOptions: {
      durable: true,
      // arguments: {
      //   'x-dead-letter-routing-key': 'transfer.requested.dlq',
      // },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'transfer.completed',
    queueOptions: {
      durable: true,
      // arguments: {
      //   'x-dead-letter-routing-key': 'transfer.completed.dlq',
      // },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'transfer.failed',
    queueOptions: {
      durable: true,
      // arguments: {
      //   'x-dead-letter-routing-key': 'transfer.failed.dlq',
      // },
    },
  },
];
