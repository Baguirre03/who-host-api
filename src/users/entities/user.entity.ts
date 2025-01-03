import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  lattitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  password: string;

  @ApiProperty()
  isAdmin: boolean;
}

/*   id            String   @id @default(uuid())
  username      String
  name          String
  description   String?
  lattitude     Float?
  longitude     Float?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  password      String
  hostedParties Party[]  @relation("PartyHost")
  parties       Party[]  @relation("PartyMembers")*/
