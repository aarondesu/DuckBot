import { resolve } from 'path';
import dotenv from 'dotenv';
import DiscordBot from './bot';
import logger from './logger';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const client = new DiscordBot();
client.start().catch((err) => {
  logger.error(err);
});
