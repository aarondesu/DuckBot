/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';

import { logger, connectDB } from '@duckbot/common/dist';
import routes from './routes';

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') });

const app = express();
const PORT = process.env.PORT || 60;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

connectDB(process.env.DATABASE_URL as string)
  .then((sequelize) => sequelize.sync())
  .then(() => {
    logger.info('Starting API server...');
    app.listen(PORT, () => {
      logger.info(`Api server started! Listening on PORT: ${PORT}`);
    });
  })
  .catch(({ stack }) => {
    logger.error(stack);
    logger.error('API Exiting');
    process.exit(0);
  });
