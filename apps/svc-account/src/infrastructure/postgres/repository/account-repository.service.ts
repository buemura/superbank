import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/domain/account/account.entity';
import { CreateAccountDto } from 'src/domain/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/domain/account/dto/update-account.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepositoryService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create({
      ...createAccountDto,
      account: this.generateAccountNumber(),
      agency: '0001', // fixed
      bank: '919', // superbank code
      balance: 0,
      status: 'active',
    });

    return this.accountRepository.save(account);
  }

  async findOneById(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) throw new NotFoundException(`Account ID ${id} not found`);
    return account;
  }

  async findBalanceById(id: number): Promise<number> {
    const account = await this.findOneById(id);
    return account.balance;
  }

  async updateAccount(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.findOneById(id);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async closeAccount(id: number): Promise<boolean> {
    const account = await this.findOneById(id);

    if (account.balance > 0) {
      throw new Error('Not possible to close account with a positive balance');
    }

    if (account.status === 'closed') {
      throw new Error('Account already closed');
    }

    account.status = 'closed';
    await this.accountRepository.save(account);

    return true;
  }

  private generateAccountNumber(): string {
    const number = Math.floor(100000 + Math.random() * 900000).toString();
    const digit = this.calculateCheckDigit(number);
    return `${number}-${digit}`;
  }

  private calculateCheckDigit(accountNumber: string): number {
    const sum = accountNumber
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
    return sum % 10;
  }
}
