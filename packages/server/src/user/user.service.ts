import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@duckbot/common';
import { CreateUserIput } from './user.input';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(data: CreateUserIput): Promise<User> {
    const user = await this.userRepository
      .create({
        id: data.id,
        tag: data.tag,
        avatar: data.avatar,
      })
      .save();

    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user as User;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
