/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const MENU_COLOR = '';
export const BACKGROUND_COLOR = '';

export const API_AUTH_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://duckbot-rappy/api/v1/auth/discord'
    : 'http://localhost:5000/api/v1/auth/discord';
