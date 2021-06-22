/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from '@config';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';

export async function connectDB() {
  return new Sequelize(DatabaseConfig.uri as string, {
    models: [resolve(__dirname, 'models')],
  });
}
