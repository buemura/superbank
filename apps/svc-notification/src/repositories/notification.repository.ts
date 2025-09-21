import { Notification } from '@/entities/notification';
import { NotificationStatus } from '@/enums/notification-status.enum';

export const NOTIFICATION_REPOSITORY = 'NOTIFICATION_REPOSITORY';

export interface NotificationRepository {
  create(data: Notification): Notification | Promise<Notification>;
  update(
    id: number,
    status: NotificationStatus,
  ): Notification | Promise<Notification>;
}
