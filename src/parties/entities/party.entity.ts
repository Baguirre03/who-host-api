import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Party } from '@prisma/client';

export class PartyEntity implements Party {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  hostId: string;

  @ApiProperty()
  status: $Enums.PartyStatus;
}

/* 
model Party {
  id          String      @id @default(uuid())
  name        String
  description String?
  time        DateTime
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  hostId      String
  status      PartyStatus @default(PLANNING)
  host        User        @relation("PartyHost", fields: [hostId], references: [id])
  members     User[]      @relation("PartyMembers")
}
*/
