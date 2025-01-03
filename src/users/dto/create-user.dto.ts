import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isAdmin: boolean;
}
