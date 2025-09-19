import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { NotificationConsumer } from './notification.consumer';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController, NotificationConsumer],
  providers: [NotificationService],
})
export class NotificationModule {}
