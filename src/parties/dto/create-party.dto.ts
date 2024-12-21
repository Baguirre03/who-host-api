import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreatePartyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  hostId: string;

  @ApiProperty({ required: false })
  status: $Enums.PartyStatus;
}
