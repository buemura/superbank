import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MaxLength(100)
  userName: string;

  @IsString()
  @MaxLength(100)
  userLastName: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  userNickname?: string;

  @IsString()
  @MaxLength(11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;
}
