import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserPreferredChannel)
  preferredChannel: UserPreferredChannel;
}
