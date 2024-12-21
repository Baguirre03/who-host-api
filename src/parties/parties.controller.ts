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

@Controller('parties')
@ApiTags('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  @ApiCreatedResponse({ type: PartyEntity })
  async create(@Body() createPartyDto: CreatePartyDto) {
    return new PartyEntity(await this.partiesService.create(createPartyDto));
  }

  @Get()
  @ApiOkResponse({ type: PartyEntity, isArray: true })
  async findAll() {
    const parties = await this.partiesService.findAll();
    return parties.map((party) => new PartyEntity(party));
  }

  @Get(':id')
  @ApiOkResponse({ type: PartyEntity })
  async findOne(@Param('id') id: string) {
    const party = await this.partiesService.findOne(id);
    if (!party) {
      throw new NotFoundException(`Party with ID: ${id} does note exist`);
    }
    return new PartyEntity(party);
  }

  @Patch(':id')
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
  @ApiOkResponse({ type: PartyEntity })
  async remove(@Param('id') id: string) {
    return new PartyEntity(await this.partiesService.remove(id));
  }
}
