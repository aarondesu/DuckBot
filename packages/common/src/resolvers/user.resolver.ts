/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Arg, Mutation, Query } from 'type-graphql';
import { Entity } from 'typeorm';

import logger from '../lib/logger';
import { User } from '../entities/user.entity';

@Entity()
export class UserResolver {
  @Mutation(() => Boolean)
  async createUser(
    @Arg('id') id: string,
    @Arg('tag') tag: string,
    @Arg('avatar') avatar: string
  ) {
    try {
      await User.insert({ id, tag, avatar });
      return true;
    } catch ({ stack }) {
      logger.error(stack);
      return false;
    }
  }

  @Query(() => User)
  async users() {
    const users = await User.find();
    return users;
  }
}
