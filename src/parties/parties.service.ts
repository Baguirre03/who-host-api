import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return this.prisma.party.create({ data: createPartyDto });
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
