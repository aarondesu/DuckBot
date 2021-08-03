import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User } from '@duckbot/common';

import AuthModule from './auth/auth.module';
import GraphqQLModule from './graphql/graphql.module';

@Module({
  imports: [
    AuthModule,
    GraphqQLModule,
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
