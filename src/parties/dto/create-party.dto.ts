import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePartyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(60)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  time: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hostId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  adminId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hostType: $Enums.PartyHostType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  status: $Enums.PartyStatus;
}
