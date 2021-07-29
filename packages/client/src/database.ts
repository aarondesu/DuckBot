/* eslint-disable import/prefer-default-export */
import { createConnection } from 'typeorm';
import { User, Guild, Session } from '@duckbot/common/dist';

const connectDB = (url: string) =>
  createConnection({
    type: 'postgres',
    url,
    ssl: {
      rejectUnauthorized: false,
      requestCert: true,
    },
    entities: [User, Guild, Session],
    synchronize: true,
  });

export default connectDB;
