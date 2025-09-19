import {
  index,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './user.schema';

export const inAppNotificationStatusEnum = pgEnum(
  'in_app_notification_status',
  ['pending', 'sent', 'read', 'failed', 'canceled'],
);

export const inAppNotificationsTable = pgTable(
  'in_app_notifications',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar('user_id', { length: 100 })
      .notNull()
      .references(() => usersTable.userId, { onDelete: 'cascade' }),
    status: inAppNotificationStatusEnum('status').notNull().default('pending'),
    title: varchar('title', { length: 255 }).notNull(),
    content: varchar('content', { length: 255 }).notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    readAt: timestamp('read_at', { withTimezone: true }),
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
