/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Inject, Injectable } from '@nestjs/common';

import { Guild } from '../graphql/user/user.input';

@Injectable()
export default class DiscordService {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {}

  fetchGuilds(accessToken: string): Observable<Guild[]> {
    return this.httpService
      .get<Guild[]>('https://discord.com/api/v8/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map((response) => response.data));
  }

  fetchBotGuilds(): Observable<AxiosResponse<Guild[]>> {
    const botToken = process.env.DISCORD_TOKEN as string;
    return this.httpService
      .get<AxiosResponse<Guild[]>>(
        'https://discord.com/api/v8/users/@me/guilds',
        {
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        }
      )
      .pipe(map((response) => response.data));
  }

  validateGuild(_id: string): boolean {
    const botToken: string = process.env.DISCORD_TOKEN as string;
    const result = this.httpService
      .get<Guild[]>('https://discord.com/api/v8/users/@me/guilds', {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      })
      .pipe(map((response) => response.data));

    let guilds: Guild[] = [];
    result.subscribe((response) => {
      guilds = response;
      console.log(guilds);
    });

    const valid = false;
    return valid;
  }
}
