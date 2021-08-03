import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import UserModule from './user/user.module';

import { isProduction } from '../config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: !isProduction,
      useGlobalPrefix: true,
      autoSchemaFile: path.resolve(__dirname, './schemal.gql'),
      include: [UserModule],
    }),
    UserModule,
  ],
  exports: [UserModule],
})
export default class GraphqlModule {}
