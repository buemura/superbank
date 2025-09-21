import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserPreferredChannel)
  preferredChannel: UserPreferredChannel;
}
