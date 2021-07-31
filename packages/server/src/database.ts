/* eslint-disable import/prefer-default-export */
import { createConnection } from 'typeorm';
import { User, Guild, Session, Prefix } from '@duckbot/common';

const connectDB = (url: string) =>
  createConnection({
    type: 'postgres',
    url,
    ssl: {
      rejectUnauthorized: false,
      requestCert: true,
    },
    entities: [User, Guild, Session, Prefix],
    synchronize: true,
  });

export default connectDB;
