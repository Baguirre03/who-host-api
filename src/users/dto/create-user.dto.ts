import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
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
