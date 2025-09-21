import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './user.schema';

export const notificationStatusEnum = pgEnum('notification_status', [
  'pending',
  'sent',
  'read',
  'failed',
  'canceled',
]);

export const notificationsTable = pgTable(
  'notifications',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar('user_id', { length: 100 })
      .notNull()
      .references(() => usersTable.userId, { onDelete: 'cascade' }),
    status: notificationStatusEnum('status').notNull().default('pending'),
    channel: varchar('channel', { length: 20 }).notNull(),
    metadata: jsonb('metadata'),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdx: index('notifications_user_id_idx').on(table.userId),
  }),
);
