import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import corsMiddleware from './src/middlewares/cors.js';
import leadRoutes from './src/modules/leads/lead.routes.js';
import campaignRoutes from './src/modules/campaigns/campaign.routes.js';
import locationRoutes from './src/modules/locations/location.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import limiter from './src/middlewares/limiter.js';

const createApp = () => {
  const app = express();


  // Middlewares
  app.use(helmet());
  app.use(corsMiddleware);
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  // Routes
  app.use('/api/leads', leadRoutes);
  app.use('/api/campaigns', campaignRoutes);
  app.use('/api/locations', locationRoutes);

  // Health check
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  // 404 handler
  app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

  // Error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
