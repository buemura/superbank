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

export const emailNotificationStatusEnum = pgEnum('email_notification_status', [
  'pending',
  'sent',
  'failed',
  'canceled',
]);

export const emailNotificationsTable = pgTable(
  'email_notifications',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar('user_id', { length: 100 })
      .notNull()
      .references(() => usersTable.userId, { onDelete: 'cascade' }),
    status: emailNotificationStatusEnum('status').notNull().default('pending'),
    content: jsonb('content').notNull(),
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
