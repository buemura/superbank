import { Module } from '@nestjs/common';

import { NOTIFICATION_REPOSITORY } from '@/repositories/notification.repository';
import { USER_REPOSITORY } from '@/repositories/user.repository';
import { DrizzleNotificationRepository } from './drizzle/repositories/notification.repository';
import { DrizzleUserRepository } from './drizzle/repositories/user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository,
    },
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: DrizzleNotificationRepository,
    },
  ],
  exports: [USER_REPOSITORY, NOTIFICATION_REPOSITORY],
})
export class DatabaseModule {}
