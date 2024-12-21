import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  create(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }

  @Get()
  @ApiOkResponse({ type: PartyEntity, isArray: true })
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PartyEntity })
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PartyEntity })
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(id, updatePartyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PartyEntity })
  remove(@Param('id') id: string) {
    return this.partiesService.remove(id);
  }
}
