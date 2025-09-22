import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AccountRepositoryService } from './infrastructure/postgres/repository/account-repository.service';
import { CreateAccountDto } from './domain/account/dto/create-account.dto';
import { Account } from './domain/account/account.entity';
import { UpdateAccountDto } from './domain/account/dto/update-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountRepositoryService: AccountRepositoryService,
  ) {}

  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return await this.accountRepositoryService.create(createAccountDto);
  }

  @Get(':id')
  async getAccountDetails(@Param('id') id: number): Promise<Account> {
    return await this.accountRepositoryService.findOneById(id);
  }

  @Get(':id/balance')
  async getAccountBalance(
    @Param('id') id: number,
  ): Promise<{ balance: number }> {
    const balance = await this.accountRepositoryService.findBalanceById(id);
    return { balance };
  }

  @Patch(':id')
  async updateAccount(
    @Param('id') id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return await this.accountRepositoryService.updateAccount(
      id,
      updateAccountDto,
    );
  }

  @Delete(':id')
  async closeAccount(@Param('id') id: number): Promise<boolean> {
    return await this.accountRepositoryService.closeAccount(id);
  }
}
