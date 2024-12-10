export interface IConfig {
  env: string;
  port: number;
  apiVersion: string;
  database: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
} 