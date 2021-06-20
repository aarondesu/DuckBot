import { resolve } from 'path';
import dotenv from 'dotenv';
import DiscordBot from '@structures/bot';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const client = new DiscordBot();

async function start() {
  await client.start();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
