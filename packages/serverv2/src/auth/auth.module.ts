import { Module } from '@nestjs/common';

import AuthController from './auth.controller';
import DiscordStrategy from './utils/discord.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [DiscordStrategy],
})
export default class AuthModule {}
