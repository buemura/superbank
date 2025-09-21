// queues.ts
export const USER_CREATED_EVENT = 'user.created';
export const USER_UPDATED_EVENT = 'user.updated';
export const TRANSFER_REQUESTED_EVENT = 'transfer.requested';
export const TRANSFER_COMPLETED_EVENT = 'transfer.completed';
export const TRANSFER_FAILED_EVENT = 'transfer.failed';

export const queues = [
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: USER_CREATED_EVENT,
    queueOptions: { durable: true },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: USER_UPDATED_EVENT,
    queueOptions: { durable: true },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: TRANSFER_REQUESTED_EVENT,
    queueOptions: { durable: true },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: TRANSFER_COMPLETED_EVENT,
    queueOptions: { durable: true },
  },
  {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    queueName: TRANSFER_FAILED_EVENT,
    queueOptions: { durable: true },
  },
] as const;

export const EVENTS_EXCHANGE = 'app.events'; // topic exchange
