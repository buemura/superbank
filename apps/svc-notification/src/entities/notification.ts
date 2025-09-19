import {
  EmailNotificationStatus,
  InAppNotificationStatus,
} from '@/enums/notification-status.enum';

export class EmailNotification {
  id?: number;
  userId: string;
  status: EmailNotificationStatus;
  content: any;
  sentAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class InAppNotification {
  id?: number;
  userId: string;
  status: InAppNotificationStatus;
  title: string;
  content: string;
  sentAt?: Date | null;
  readAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
