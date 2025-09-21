import {
  integer,
  pgTable,
  timestamp,
  varchar,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const preferredChannelEnum = pgEnum('prefered_channel', [
  'email',
  'in_app',
  'all',
]);

export const usersTable = pgTable(
  'users',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar('user_id', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    preferredChannel: preferredChannelEnum('preferred_channel')
      .default('all')
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIdx: index('users_user_id_idx').on(table.userId),
    emailIdx: index('users_email_idx').on(table.email),
  }),
);
