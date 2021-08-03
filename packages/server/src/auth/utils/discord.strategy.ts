/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DiscordStrategy extends PassportStrategy(
  Strategy,
  'discord'
) {
  constructor() {
    super({
      clientID: process.env.DASHBOARD_CLIENT_ID as string,
      clientSecret: process.env.DASHBOARD_CLIENT_SECRET as string,
      callbackUrl: process.env.DASHBOARD_CLIENT_CALLBACK_URL as string,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(
    _accessToken: string,
    _refresToken: string,
    _profile: Profile
  ) {
    // TODO
  }
}
