import winston from 'winston';
import color from '@heroku-cli/color';

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return color.app(`[${timestamp as string}] (${level}) ${message} `);
  })
);

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return process.env.NODE_ENV === 'development' ? 'debug' : 'info';
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  level: level(),
  levels: customLevels,
  format: customFormat,
});

export default logger;
