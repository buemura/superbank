import { eq } from 'drizzle-orm';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UpdateUserDto } from '@/dtos/update-user.dto';
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
      preferredChannel:
        UserPreferredChannel[dbUser.preferredChannel.toUpperCase()],
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
        preferredChannel:
          UserPreferredChannel[data.preferredChannel.toUpperCase()],
      })
      .returning();
    return this.mapToUserEntity(user) || null;
  }

  async update(data: UpdateUserDto): Promise<User | null> {
    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) {
      updatePayload.name = data.name;
    }

    if (data.email !== undefined) {
      updatePayload.email = data.email;
    }

    if (data.preferredChannel !== undefined) {
      updatePayload.preferredChannel =
        UserPreferredChannel[data.preferredChannel.toUpperCase()];
    }

    const [user] = await this.db
      .update(usersTable)
      .set(updatePayload)
      .where(eq(usersTable.userId, data.userId))
      .returning();

    return user ? this.mapToUserEntity(user) : null;
  }
}
