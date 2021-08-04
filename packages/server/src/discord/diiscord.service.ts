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

  fetchGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>> {
    return this.httpService
      .get<AxiosResponse<Guild[]>>(
        'https://discord.com/api/v8/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .pipe(map((response) => response.data));
  }
}
