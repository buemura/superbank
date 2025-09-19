import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { User } from '@/entities/user';
import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';
import { UserRepository } from '@/repositories/user.repository';
import { usersTable } from '../schemas/user.schema';

export class DrizzleUserRepository implements UserRepository {
  private db: NodePgDatabase;

  constructor() {
    this.db = drizzle(process.env.DATABASE_URL!);
  }

  private mapToUserEntity(dbUser: any): User {
    return {
      ...dbUser,
      preferredChannel: UserPreferredChannel[dbUser.preferredChannel],
    };
  }

  async findByUserId(userId: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, userId));

    return this.mapToUserEntity(user) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return this.mapToUserEntity(user) || null;
  }

  async create(data: User): Promise<User> {
    const [user] = await this.db
      .insert(usersTable)
      .values({
        ...data,
        preferredChannel: UserPreferredChannel[data.preferredChannel],
      })
      .returning();
    return this.mapToUserEntity(user) || null;
  }
}
