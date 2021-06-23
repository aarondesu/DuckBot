import winston from 'winston';
import moment from 'moment';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp }) => {
    return ` [${timestamp as string}] (${level}) ${message} `;
  })
);

const formatFile = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: false }),
  winston.format.printf(({ level, message, timestamp }) => {
    return ` [${timestamp as string}] (${level}) ${message} `;
  })
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    format: formatFile,
    level: 'error',
  }),
  new winston.transports.File({
    filename: `logs/${moment().format('YYYY-MM-DD')}.log`,
    format: formatFile,
  }),
];

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = winston.createLogger({
  levels,
  format,
  transports,
});

export default logger;
