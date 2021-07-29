/* eslint-disable no-console */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') });

export const DatabaseConfig = {
  url: process.env.DATABASE_URL as string,
};

export const StrategyConfig = {
  id: process.env.DASHBOARD_CLIENT_ID as string,
  secret: process.env.DASHBOARD_CLIENT_SECRET as string,
  callbackUrl: process.env.DASHBOARD_CLIENT_CALLBACK_URL as string,
};
