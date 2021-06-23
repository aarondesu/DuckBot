/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from '@config';
import logger from '@lib/logger';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';

export async function connectDB() {
  const conf = `${DatabaseConfig.uri as string}`;
  return new Sequelize(conf, {
    models: [resolve(__dirname, 'models')],
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (message) => logger.info(`DB: ${message}`),
  });
}
