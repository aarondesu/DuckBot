/* eslint-disable class-methods-use-this */
import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { VerifyCallback } from '@oauth-everything/passport-discord';
import { User } from '@duckbot/common';

import UserService from '../../graphql/user/user.service';

@Injectable()
export default class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {
    super();
  }

  async serializeUser(user: User, done: VerifyCallback<string>) {
    done(undefined, user.id);
  }

  async deserializeUser(id: string, done: VerifyCallback<User>) {
    const userDB = await this.userService.findUser(id);
    return userDB ? done(undefined, userDB) : done(undefined, undefined);
  }
}
