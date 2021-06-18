import { resolve } from 'path';
import dotenv from 'dotenv';
import DiscordBot from 'structures/bot';
import logger from 'lib/logger';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const client = new DiscordBot();
client.start().catch((err) => {
  logger.error(err);
});
