import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { logger, Session, UserResolver } from '@duckbot/common';
import { TypeormStore } from 'typeorm-store';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import path from 'path';

import { PORT } from './constants';
import { DatabaseConfig } from './config';
import connectDB from './database';
import routes from './routes';

import './strategies/discord';

const app = express();

connectDB(DatabaseConfig.url)
  .then(async (connection) => {
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

    const schema = await buildSchema({
      resolvers: [UserResolver],
    });

    app.use('/api/v1', routes);
    app.use(
      '/api/graphql',
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

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
