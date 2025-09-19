import { Module } from '@nestjs/common';

import { NotificationModule } from './modules/notification/notification.module';
import { UserModule } from './modules/user/user.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [QueueModule, UserModule, NotificationModule],
  controllers: [],
})
export class AppModule {}
