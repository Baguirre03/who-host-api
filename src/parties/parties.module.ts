import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PartiesController],
  providers: [PartiesService],
  imports: [PrismaModule, UsersModule],
  exports: [PartiesService],
})
export class PartiesModule {}
