import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@duckbot/common';

import UserResolver from './user.resolver';
import UserService from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export default class UserModule {}
