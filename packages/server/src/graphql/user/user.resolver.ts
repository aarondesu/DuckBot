/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// import { Inject } from '@nestjs/common';
import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '@duckbot/common';

import UserService from './user.service';
import { CreateUserIput, UpdateUserInput, Guild } from './user.input';

import DiscordService from '../../discord/diiscord.service';

@Resolver(() => User)
export default class UserResolver {
  constructor(
    private readonly discordService: DiscordService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'data', type: () => CreateUserIput })
    data: CreateUserIput
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    const user = await this.userService.findUser(id);
    return user;
  }

  @Query(() => [User])
  async users() {
    return this.userService.findUsers();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args({ name: 'data', type: () => UpdateUserInput }) data: UpdateUserInput
  ) {
    const user = this.userService.updateUser(id, data);
    return user;
  }

  @ResolveField(() => [Guild])
  async guilds(@Parent() user: User) {
    return this.discordService.fetchGuilds(user.accessToken);
  }
}
