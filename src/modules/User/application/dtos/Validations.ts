import { IsEmail, IsNumber, IsString, IsObject } from 'class-validator';

export class FindOneParams {
  @IsNumber()
  id: number;
}

export class SaveUserDto {
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
  role: string;

  @IsString()
  location: string;

  @IsObject()
  availability: {
    days: number[];
    month: number;
    year: number;
  };
}

export class Query {
  @IsNumber()
  id: number;

  @IsObject()
  body: {
    name: string | null;
    artistic_name: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
    role: string | null;
    location: string | null;
    availability: {
      days: number[] | null;
      month: number | null;
      year: number | null;
    };
  };
}
