import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Notification } from '@/entities/notification';
import { NotificationStatus } from '@/enums/notification-status.enum';
import { NotificationRepository } from '@/repositories/notification.repository';
import { notificationsTable } from '../schemas/notification.schema';

export class DrizzleNotificationRepository implements NotificationRepository {
  private db: NodePgDatabase;

  constructor() {
    this.db = drizzle(process.env.DATABASE_URL!);
  }

  private mapToEntity(dbNotification: any): Notification {
    return {
      ...dbNotification,
      status: NotificationStatus[dbNotification.status.toUpperCase()],
    };
  }

  async create(data: Notification): Promise<Notification> {
    const [notification] = await this.db
      .insert(notificationsTable)
      .values(data)
      .returning();
    return this.mapToEntity(notification);
  }

  async update(id: number, status: NotificationStatus): Promise<Notification> {
    const [notification] = await this.db
      .update(notificationsTable)
      .set({ status, sentAt: new Date(), updatedAt: new Date() })
      .where(eq(notificationsTable.id, id))
      .returning();
    return this.mapToEntity(notification);
  }
}
