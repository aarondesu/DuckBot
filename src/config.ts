/* eslint import/prefer-default-export: 0 */
import { Snowflake } from 'discord.js';

export const ClientConfig = {
  owners: process.env.OWNER_IDS?.split(',') as Snowflake[],
  token: process.env.DISCORD_TOKEN,
  testServerId: process.env.DEVELOPER_TEST_SERVER,
  defaultPrefix: '?',
};
