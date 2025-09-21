import { NotificationStatus } from '@/enums/notification-status.enum';

export class Notification {
  id?: number;
  userId: string;
  status: NotificationStatus;
  channel: string;
  metadata: {
    [key: string]: string;
  };
  sentAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
