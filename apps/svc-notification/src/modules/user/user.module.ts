import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { UserConsumer } from './user.consumer';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserConsumer],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
