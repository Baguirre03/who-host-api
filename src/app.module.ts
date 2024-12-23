import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PartiesModule } from './parties/parties.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, PartiesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
