import { IsString, IsNumber, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class FindOneParams {
  @IsNumber()
  id: number;
}

export class SaveEventDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  observations: string;

  @IsNumber()
  price: number;

  @IsEnum(['wedding', 'birthday', 'corporate', 'other'])
  type: string;

  @IsString()
  contact: string;

  @IsNumber()
  userId: number;
}
