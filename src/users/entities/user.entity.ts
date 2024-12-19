import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserEntity implements User {
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
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  password: string;
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
