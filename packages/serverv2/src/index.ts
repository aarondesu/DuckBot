/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { logger } from '@duckbot/common';
import passport from 'passport';

import AppModule from './app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors({
      origin: '*',
      credentials: true,
    });

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
