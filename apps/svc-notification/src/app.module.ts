import { Module } from '@nestjs/common';

import { NotificationModule } from './modules/notification/notification.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [QueueModule, NotificationModule],
  controllers: [],
})
export class AppModule {}
