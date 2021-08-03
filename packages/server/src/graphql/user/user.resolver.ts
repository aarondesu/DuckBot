/* eslint-disable class-methods-use-this */
import {} from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { User } from '@duckbot/common';

import UserService from './user.service';
import { CreateUserIput, UpdateUserInput } from './user.input';

@Resolver('User')
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    const user = this.userService.findUser(id);
    return user;
  }

  @Query(() => [User])
  async users() {
    return this.userService.findUsers();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args({ name: 'data', type: () => UserService }) data: UpdateUserInput
  ) {
    const user = this.userService.updateUser(id, data);
    return user;
  }
}
