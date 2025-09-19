export const USER_CREATED_EVENT = 'user.created';
export const USER_UPDATED_EVENT = 'user.updated';
export const TRANSFER_REQUESTED_EVENT = 'tranfer.requested';
export const TRANSFER_COMPLETED_EVENT = 'tranfer.completed';
export const TRANSFER_FAILED_EVENT = 'tranfer.failed';

export const queues = [
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'user.created',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'user.created.dlq',
      },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'user.updated',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'user.updated.dlq',
      },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'tranfer.requested',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'tranfer.requested.dlq',
      },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'tranfer.completed',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'tranfer.completed.dlq',
      },
    },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: 'tranfer.failed',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'tranfer.failed.dlq',
      },
    },
  },
];
