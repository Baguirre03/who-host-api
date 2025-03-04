import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import findHost, { findHostTypes } from './helper';

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return this.prisma.party.create({ data: createPartyDto });
  }

  async joinParty(id: string, user: string) {
    const party = await this.prisma.party.update({
      where: { id },
      data: { members: { connect: { id: user } } },
      include: { members: true },
    });

    let host: UserEntity = findHost(party, { type: party.hostType });
    const newParty2 = await this.prisma.party.update({
      where: { id },
      data: { hostId: host.id },
    });

    return newParty2;
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

  async update(id: string, updatePartyDto: UpdatePartyDto) {
    const { hostId, ...updateData } = updatePartyDto;

    const party = await this.prisma.party.update({
      where: { id },
      data: updateData,
      include: { members: true },
    });

    let obj: findHostTypes = hostId
      ? { type: party.hostType, memberId: hostId }
      : { type: party.hostType };
    let host: UserEntity = findHost(party, obj);
    console.log('HOST', host);

    const newParty2 = await this.prisma.party.update({
      where: { id },
      data: {
        host: host ? { connect: { id: host.id } } : { disconnect: true },
      },
    });

    return newParty2;
  }

  remove(id: string) {
    return this.prisma.party.delete({ where: { id } });
  }
}
