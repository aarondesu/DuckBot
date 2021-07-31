/* eslint-disable import/first */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { logger, Session } from '@duckbot/common/dist';
import { TypeormStore } from 'typeorm-store';
import path from 'path';

import { PORT } from './constants';
import { DatabaseConfig } from './config';
import connectDB from './database';
import routes from './routes';
import './strategies/discord';

const app = express();

connectDB(DatabaseConfig.url)
  .then((connection) => {
    const repository = connection.getRepository(Session);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({ repository }),
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api/v1', routes);

    // Serve dashboard on production
    if (process.env.NODE_ENV === 'production') {
      app.use(
        express.static(path.resolve(__dirname, '..', '..', 'dashboard/dist'))
      );
      app.get('*', (_req, res) => {
        res.sendFile(
          path.resolve(__dirname, '..', '..', 'dashboard/dist/index.html')
        );
      });
    }

    logger.info('Starting API server...');
    app.listen(PORT, () => {
      logger.info(`Api server started! Listening on PORT: ${PORT}`);
    });
  })
  .catch(({ stack }) => {
    logger.error(stack);
    process.exit(0);
  });
