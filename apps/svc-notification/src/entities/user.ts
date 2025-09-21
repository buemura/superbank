import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';

export class User {
  id?: number;
  userId: string;
  name: string;
  email: string;
  preferredChannel: UserPreferredChannel;
  createdAt?: Date;
  updatedAt?: Date;
}
