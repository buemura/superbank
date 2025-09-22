import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { PostgresModule } from './infrastructure/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
