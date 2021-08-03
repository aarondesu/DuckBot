export const isProduction = process.env.NODE_ENV === 'production';

export const dashboardUrl = isProduction
  ? 'https://duckbot-shinu.com'
  : 'http://localhost:8080';
