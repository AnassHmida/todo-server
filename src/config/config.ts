import dotenv from 'dotenv';
import { IConfig } from './config.interface';

dotenv.config();

export const config: IConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), 
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
}; 