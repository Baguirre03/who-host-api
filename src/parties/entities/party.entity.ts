import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Party, User } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

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

  @ApiProperty({ required: false, type: UserEntity })
  host?: UserEntity;

  @ApiProperty()
  members: Array<UserEntity>;

  constructor({ host, members, ...data }: Partial<PartyEntity>) {
    Object.assign(this, data);
    if (host) {
      this.host = new UserEntity(host);
    }
    if (members.length) {
      this.members.map((member) => new UserEntity(member));
    }
  }
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
