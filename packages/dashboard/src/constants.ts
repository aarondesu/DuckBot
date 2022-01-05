/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const MENU_COLOR = '';
export const BACKGROUND_COLOR = '';

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://duckbot-rappy.herokuapp.com/api/v1'
    : 'http://localhost:5000/api/v1';

export const API_AUTH_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://duckbot-rappy.herokuapp.com/api/v1/auth/login'
    : 'http://localhost:5000/api/v1/auth/login';

export const DISCORD_INVITE_URL = process.env.DISCORD_BOT_INVITE_URL as string;
