/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from '@common/config';
import logger from '@common/lib/logger';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';

export default async function connectDB() {
  const conf = `${DatabaseConfig.uri as string}`;
  return new Sequelize(conf, {
    models: [resolve(__dirname, './common/models')],
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (message) => logger.debug(`DB: ${message}`),
  });
}
