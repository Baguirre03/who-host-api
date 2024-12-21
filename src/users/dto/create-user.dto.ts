import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(60)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsNotEmpty()
  @IsLatitude()
  @ApiProperty()
  lattitude: number;

  @IsNotEmpty()
  @IsLongitude()
  @ApiProperty()
  longitude: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
