import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import AuthController from './auth.controller';
import DiscordStrategy from './utils/discord.strategy';
import SessionSerializer from './utils/session.serializer';

import UserModule from '../graphql/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'discord', session: true }),
  ],
  controllers: [AuthController],
  providers: [DiscordStrategy, SessionSerializer],
})
export default class AuthModule {}
