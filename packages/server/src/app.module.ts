import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User, Guild } from '@duckbot/common';
import { HttpModule } from '@nestjs/axios';

import AuthModule from './auth/auth.module';
import GraphqQLModule from './graphql/graphql.module';
import DiscordModule from './discord/discord.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    DiscordModule,
    GraphqQLModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL as string,
      ssl: {
        rejectUnauthorized: false,
        requestCert: true,
      },
      entities: [User, Session, Guild],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
