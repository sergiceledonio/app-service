import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  artistic_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  location: string;

  @IsString()
  role: string;
}
