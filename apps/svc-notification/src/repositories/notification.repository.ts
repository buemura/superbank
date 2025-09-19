import { EmailNotification, InAppNotification } from '@/entities/notification';
import {
  EmailNotificationStatus,
  InAppNotificationStatus,
} from '@/enums/notification-status.enum';

export const EMAIL_NOTIFICATION_REPOSITORY = 'EMAIL_NOTIFICATION_REPOSITORY';

export interface EmailNotificationRepository {
  create(data: EmailNotification): void | Promise<void>;
  updateStatus(
    id: string,
    status: EmailNotificationStatus,
  ): void | Promise<void>;
}

export const IN_APP_NOTIFICATION_REPOSITORY = 'IN_APP_NOTIFICATION_REPOSITORY';

export interface InAppNotificationRepository {
  create(data: InAppNotification): void | Promise<void>;
  updateStatus(
    id: string,
    status: InAppNotificationStatus,
  ): void | Promise<void>;
}
