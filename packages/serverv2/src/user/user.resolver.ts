/* eslint-disable class-methods-use-this */
import {} from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';

import UserService from './user.service';
import { User } from './user.entity';
import { CreateUserIput } from './user.input';

@Resolver('User')
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    const user = this.userService.getUser(id);
    return user;
  }

  @Query(() => [User])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'data', type: () => CreateUserIput })
    data: CreateUserIput
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
