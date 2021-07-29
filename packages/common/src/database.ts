/* eslint-disable import/prefer-default-export */
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';
import logger from './lib/logger';

export default async function connectDB(uri: string) {
  return new Sequelize(uri, {
    models: [resolve(__dirname, './models')],
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (message) => logger.debug(`DB: ${message}`),
  });
}
