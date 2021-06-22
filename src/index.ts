import { resolve } from 'path';
import dotenv from 'dotenv';
import DiscordBot from '@structures/bot';
import logger from '@lib/logger';

dotenv.config({ path: resolve('.env') });

const client = new DiscordBot();
client.start().catch(({ message, stack }) =>
  logger.error(
    `An error occured. ${message as string} 
      \nStack: ${stack as string}`
  )
);
