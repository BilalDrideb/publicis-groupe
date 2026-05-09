import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import corsMiddleware from './src/middlewares/cors.js';
import leadRoutes from './src/modules/leads/lead.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const createApp = () => {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  // Routes
  app.use('/leads', leadRoutes);

  // Health check
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // 404 handler
  app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

  // Error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
