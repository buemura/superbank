import { Module } from '@nestjs/common';

import {
  EMAIL_NOTIFICATION_REPOSITORY,
  IN_APP_NOTIFICATION_REPOSITORY,
} from '@/repositories/notification.repository';
import { USER_REPOSITORY } from '@/repositories/user.repository';
import { DrizzleEmailNotificationRepository } from './drizzle/repositories/email-notification.repository';
import { DrizzleInAppNotificationRepository } from './drizzle/repositories/in-app-notification.repository';
import { DrizzleUserRepository } from './drizzle/repositories/user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository,
    },
    {
      provide: EMAIL_NOTIFICATION_REPOSITORY,
      useClass: DrizzleEmailNotificationRepository,
    },
    {
      provide: IN_APP_NOTIFICATION_REPOSITORY,
      useClass: DrizzleInAppNotificationRepository,
    },
  ],
  exports: [
    USER_REPOSITORY,
    EMAIL_NOTIFICATION_REPOSITORY,
    IN_APP_NOTIFICATION_REPOSITORY,
  ],
})
export class DatabaseModule {}
