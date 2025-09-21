import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '../user/user.module';
import { NotificationConsumer } from './notification.consumer';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [NotificationController, NotificationConsumer],
  providers: [NotificationService],
})
export class NotificationModule {}
