import { PresenceData } from 'discord.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') });

export const ClientConfig = {
  owners: process.env.OWNER_IDS?.split(',') as string[],
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.PREFIX,
  environment: process.env.NODE_ENV,
  resetCommands: process.env.RESET_COMMANDS,
  guildDev: process.env.GUILD_DEV,
};

export const APITokens = {
  twitter: {
    appId: process.env.TWITTER_APP_ID as string,
    apiKey: process.env.TWITTER_API_KEY as string,
    apiSecret: process.env.TWITTER_API_SECRET as string,
    bearerToken: process.env.TWITTER_BEARER_TOKEN as string,
  },
  reddit: {
    secret: process.env.REDDIT_SECRET_KEY as string,
    clientId: process.env.REDDIT_CLIENT_ID as string,
    refreshToekn: process.env.REDDIT_REFRESH_TOKEN as string,
    accessToken: process.env.REDDIT_ACCESS_TOKEN as string,
  },
  translate: {
    rapidApi: process.env.RAPID_API_KEY as string,
    detectLanguage: process.env.DETECTLANGUAGE_API_KEY as string,
  },
};

export const DatabaseConfig = {
  uri: process.env.DATABASE_URL as string,
};

export const weebResultLimit = 200;
export const weebSfwSource = [
  'Animewallpaper',
  'awwnime',
  'twintails',
  'Melanime',
  'animegifs',
  'wholesomeyuri',
  'kemonomimi',
  'megane',
  'kitsunemimi',
];

export const weebNsfwSourceRandom = [
  'hentai',
  'kitsunemimi',
  'yuri',
  'MonsterGirl',
  'ChurchofTits',
  'GenshinImpactNSFW',
  'Hololewd',
  'LewdVtubers',
  'AnalHentai',
];

export const weebNsfwSource = ['pantsu', 'ecchi'];

export const DuckPresence: PresenceData = {
  activities: [
    {
      name: 'Leading ducklings 🦆',
      type: 'PLAYING',
    },
  ],
  status: 'online',
};
