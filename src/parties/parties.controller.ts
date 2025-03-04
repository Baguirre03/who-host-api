import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PartyEntity } from './entities/party.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

interface basicUser {
  id: string;
}

@Controller('parties')
@ApiTags('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PartyEntity })
  async create(@Body() createPartyDto: CreatePartyDto) {
    return new PartyEntity(await this.partiesService.create(createPartyDto));
  }

  @Patch(':id/members')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PartyEntity })
  async joinParty(@Param('id') id: string, @Body() userID: basicUser) {
    return new PartyEntity(await this.partiesService.joinParty(id, userID.id));
  }

  // @Post(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: PartyEntity })
  // async joinParty(@Param('id') id: string, @Body() user: UserEntity) {
  //   return new PartyEntity(await this.partiesService.joinParty(id, user));
  // }

  @Delete('/:id/remove/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartyEntity })
  async leaveParty(
    @Param('id') id: string,
    @Body() user: UserEntity,
    @Param('userId') userId: string,
  ) {
    return new PartyEntity(
      await this.partiesService.leaveParty(id, user, userId),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartyEntity, isArray: true })
  async findAll() {
    const parties = await this.partiesService.findAll();
    return parties.map((party) => new PartyEntity(party));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartyEntity })
  async findOne(@Param('id') id: string) {
    const party = await this.partiesService.findOne(id);
    if (!party) {
      throw new NotFoundException(`Party with ID: ${id} does note exist`);
    }
    return new PartyEntity(party);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartyEntity })
  async update(
    @Param('id') id: string,
    @Body() updatePartyDto: UpdatePartyDto,
  ) {
    return new PartyEntity(
      await this.partiesService.update(id, updatePartyDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartyEntity })
  async remove(@Param('id') id: string) {
    return new PartyEntity(await this.partiesService.remove(id));
  }
}
