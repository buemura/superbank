import { User } from '@/entities/user';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findByUserId(userId: string): Promise<User | null> | User | null;
  findByEmail(email: string): Promise<User | null> | User | null;
  create(data: User): Promise<User> | User;
}
