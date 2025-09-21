import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/dtos/create-user.dto';
import { User } from '@/entities/user';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(input: CreateUserDto): Promise<User> {
    return this.userRepository.create({
      userId: input.userId,
      name: input.name,
      email: input.email,
      preferredChannel: input.preferredChannel,
    });
  }

  async updateUser(input: CreateUserDto): Promise<User | null> {
    return this.userRepository.update({
      userId: input.userId,
      name: input.name,
      email: input.email,
      preferredChannel: input.preferredChannel,
    });
  }
}
