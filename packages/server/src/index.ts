/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { logger, Session } from '@duckbot/common';
import { getRepository } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import session from 'express-session';
import passport from 'passport';

import AppModule from './app.module';

logger.info(process.env.NODE_ENV);

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5000;
    const repository = getRepository(Session);

    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: '*',
      credentials: true,
    });

    app.use(
      session({
        secret: 'duckbotdiscordsessionsecret',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({ repository }),
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(PORT, () =>
      logger.info(`Server started! Listening on  PORT ${PORT}`)
    );
  } catch ({ stack }) {
    logger.error('Failed to start server...');
    logger.error(stack);
    logger.error('Application exiting...');
    process.exit(0);
  }
}

bootstrap();
