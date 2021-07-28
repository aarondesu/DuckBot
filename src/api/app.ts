import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import logger from '@common/lib/logger';
import DiscordClient from '@bot/structures/bot';
import connectDB from '../database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 60;
const client = new DiscordClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

logger.info('Starting api server...');
connectDB()
  .then((sequelize) => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      logger.info('Api server started!');
      logger.info('Starting discord bot...');
      return client.start();
    });
  })
  .catch(({ stack }) => {
    logger.error(stack as string);
    logger.error('Bot is exiting...');
    process.exit(0);
  });
