import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return this.prisma.party.create({ data: createPartyDto });
  }

  joinParty(id: string, user: UserEntity) {
    return this.prisma.party.update({
      where: { id },
      data: { members: { connect: { id: user.id } } },
    });
  }

  async leaveParty(id: string, user: UserEntity, userId: string) {
    const party = await this.prisma.party.findUnique({
      where: { id },
      include: { admin: true },
    });

    if (party.admin.id === userId) {
      throw new Error('Admin cannot leave the party, delete the party instead');
    } else {
      return this.prisma.party.update({
        where: { id },
        data: { members: { disconnect: { id: user.id || userId } } },
      });
    }
  }

  findAll() {
    return this.prisma.party.findMany();
  }

  findOne(id: string) {
    return this.prisma.party.findUnique({
      where: { id },
      include: { host: true, members: true },
    });
  }

  update(id: string, updatePartyDto: UpdatePartyDto) {
    return this.prisma.party.update({
      where: { id },
      data: updatePartyDto,
    });
  }

  remove(id: string) {
    return this.prisma.party.delete({ where: { id } });
  }
}
