import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotificationModule } from './modules/notification/notification.module';
import { UserModule } from './modules/user/user.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QueueModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [],
})
export class AppModule {}
