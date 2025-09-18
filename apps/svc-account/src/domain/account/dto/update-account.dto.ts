import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  userNickname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;
}
