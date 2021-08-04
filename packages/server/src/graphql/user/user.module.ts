import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@duckbot/common';

import UserResolver from './user.resolver';
import UserService from './user.service';
import DiscordModule from '../../discord/discord.module';

@Module({
  imports: [DiscordModule, TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export default class UserModule {}
