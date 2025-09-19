import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { EmailNotification } from '@/entities/notification';
import { EmailNotificationStatus } from '@/enums/notification-status.enum';
import { EmailNotificationRepository } from '@/repositories/notification.repository';
import { emailNotificationsTable } from '../schemas/email-notification.schema';

export class DrizzleEmailNotificationRepository
  implements EmailNotificationRepository
{
  private db: NodePgDatabase;

  constructor() {
    this.db = drizzle(process.env.DATABASE_URL!);
  }

  async create(data: EmailNotification): Promise<void> {
    await this.db.insert(emailNotificationsTable).values(data).returning();
  }

  async updateStatus(
    id: number,
    status: EmailNotificationStatus,
  ): Promise<void> {
    await this.db
      .update(emailNotificationsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(emailNotificationsTable.id, id))
      .returning();
  }
}
