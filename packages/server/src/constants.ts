export const DASHBOARD_REDIRECT =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:8080/dashboard';

export const PORT = process.env.PORT || 5000;
