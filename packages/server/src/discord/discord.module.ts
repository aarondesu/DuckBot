import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import DiscordService from './diiscord.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [DiscordService],
  exports: [DiscordService],
})
export default class DiscordModule {}
