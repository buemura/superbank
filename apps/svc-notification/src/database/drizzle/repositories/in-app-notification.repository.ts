import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { InAppNotification } from '@/entities/notification';
import { InAppNotificationStatus } from '@/enums/notification-status.enum';
import { InAppNotificationRepository } from '@/repositories/notification.repository';
import { emailNotificationsTable } from '../schemas/email-notification.schema';
import { inAppNotificationsTable } from '../schemas/in-app-notification.schema';

export class DrizzleInAppNotificationRepository
  implements InAppNotificationRepository
{
  private db: NodePgDatabase;

  constructor() {
    this.db = drizzle(process.env.DATABASE_URL!);
  }

  async create(data: InAppNotification): Promise<void> {
    await this.db.insert(inAppNotificationsTable).values(data).returning();
  }

  async updateStatus(
    id: number,
    status: InAppNotificationStatus,
  ): Promise<void> {
    await this.db
      .update(inAppNotificationsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(emailNotificationsTable.id, id))
      .returning();
  }
}
