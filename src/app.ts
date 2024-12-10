import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import { connectDatabase } from './infrastructure/database/connection';
import routes from './infrastructure/http/routes';

const app: Application = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

const apiPrefix = `/api/${config.apiVersion}`;


connectDatabase();


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(apiPrefix, routes);

export default app; 