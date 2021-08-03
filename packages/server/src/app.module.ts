import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User } from '@duckbot/common';
import path from 'path';

import { isProduction } from './config';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
    GraphQLModule.forRoot({
      debug: !isProduction,
      useGlobalPrefix: true,
      autoSchemaFile: path.resolve(__dirname, './schemal.gql'),
      include: [UserModule],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL as string,
      ssl: {
        rejectUnauthorized: false,
        requestCert: true,
      },
      entities: [User, Session],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
