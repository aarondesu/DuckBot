/* eslint import/prefer-default-export: 0 */
import { PresenceData, Snowflake } from 'discord.js';

export const ClientConfig = {
  owners: process.env.OWNER_IDS?.split(',') as Snowflake[],
  token: process.env.DISCORD_TOKEN,
};

export const DuckPresence: PresenceData = {
  activities: [
    {
      name: 'Leading ducklings 🦆',
      type: 'PLAYING',
      url: '',
    },
  ],
};
