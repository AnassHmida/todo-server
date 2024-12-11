import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import { connectDatabase } from './infrastructure/database/connection';
import routes from './infrastructure/http/routes';
import { errorHandler } from './infrastructure/http/middleware/error.middleware';

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());


const apiPrefix = `/api/${config.apiVersion}`;


connectDatabase();


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(apiPrefix, routes);
app.use(errorHandler);

export default app; 