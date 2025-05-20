import { IsEmail, IsNumber, IsString, IsObject } from 'class-validator';

export class FindOneParams {
  @IsNumber()
  id: number;
}

export class SaveUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  role: string;
}

export class Query {
  @IsNumber()
  id: number;

  @IsObject()
  body: {
    name: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
    role: string | null;
  };
}
