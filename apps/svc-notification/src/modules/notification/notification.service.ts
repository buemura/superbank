import { Inject, Injectable } from '@nestjs/common';

import { Notification } from '@/entities/notification';
import { EventType } from '@/enums/event-type.enum';
import { NotificationStatus } from '@/enums/notification-status.enum';
import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '@/repositories/notification.repository';
import { TransferMetadata } from './templates/transfer-notification.template';

type SendNotificationInput = {
  userId: string;
  userPreferredChannel: UserPreferredChannel;
  eventType: EventType;
};

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async processNotification(input: SendNotificationInput): Promise<void> {
    const notification = await this.saveNotification(input);
    await this.sendNotification(notification);
  }

  private async saveNotification(
    input: SendNotificationInput,
  ): Promise<Notification> {
    const notification: Notification = {
      userId: input.userId,
      status: NotificationStatus.PENDING,
      channel: input.userPreferredChannel,
      metadata: this.buildMetadata(input.eventType, input.userPreferredChannel),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.notificationRepository.create(notification);
  }

  private async sendNotification(notification: Notification): Promise<void> {
    switch (notification.channel) {
      case UserPreferredChannel.EMAIL:
        console.log(
          'Sending email notification with metadata:',
          notification.metadata,
        );
        await this.notificationRepository.update(
          notification.id!,
          NotificationStatus.SENT,
        );
        break;
      case UserPreferredChannel.IN_APP:
        console.log(
          'Sending in-app notification with metadata:',
          notification.metadata,
        );
        break;
      default:
        throw new Error(`Unsupported channel: ${notification.channel}`);
    }
  }

  private buildMetadata(
    eventType: EventType,
    userPreferredChannel: UserPreferredChannel,
  ): Record<string, string> {
    switch (eventType) {
      case EventType.TRANSFER_REQUESTED:
        return TransferMetadata.buildTransferRequested(userPreferredChannel);
      case EventType.TRANSFER_COMPLETED:
        return TransferMetadata.buildTransferCompleted(userPreferredChannel);
      case EventType.TRANSFER_FAILED:
        return TransferMetadata.buildTransferFailed(userPreferredChannel);
      default:
        throw new Error(`Unsupported event type: ${eventType}`);
    }
  }
}
