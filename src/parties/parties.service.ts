import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return 'This action adds a new party';
  }

  findAll() {
    return 'returns all ';
  }

  findOne(id: number) {
    return `This action returns a #${id} party`;
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  remove(id: number) {
    return `This action removes a #${id} party`;
  }
}
