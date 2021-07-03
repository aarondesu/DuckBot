/* eslint import/prefer-default-export: 0 */
import { PresenceData, Snowflake } from 'discord.js';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve('.env') });

export const ClientConfig = {
  owners: process.env.OWNER_IDS?.split(',') as Snowflake[],
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.PREFIX,
  environment: process.env.NODE_ENV,
  resetCommands: process.env.RESET_COMMANDS,
};

export const APITokens = {
  discordToken: process.env.DISCORD_TOKEN,
  rapidApi: process.env.RAPID_API_KEY,
  detectLanguage: process.env.DETECTLANGUAGE_API_KEY,
  redditSecret: process.env.REDDIT_SECRET_KEY,
  redditClientId: process.env.REDDIT_CLIENT_ID,
  redditRefreshToken: process.env.REDDIT_REFRESH_TOKEN,
};

export const DuckPresence: PresenceData = {
  activities: [
    {
      name: 'Leading ducklings 🦆',
      type: 'PLAYING',
    },
  ],
  status: 'online',
};

export const DatabaseConfig = {
  uri: process.env.DATABASE_URL,
};
