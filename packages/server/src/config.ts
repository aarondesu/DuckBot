export const isProduction = process.env.NODE_ENV === 'production';

export const dashboardUrl = isProduction
  ? 'https://duckbot-rappy.herokuapp.com'
  : 'http://localhost:8080';
