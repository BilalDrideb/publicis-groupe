import sequelize from './src/config/database.js';
import createApp from './server.js';
import env from './src/config/env.js';

// Models
import './src/modules/locations/location.model.js';
import './src/modules/campaigns/campaign.model.js';
import './src/modules/leads/lead.model.js';

const start = async () => {
  try {
    // DB connection
    await sequelize.authenticate();
    console.log('Database connection established');

    // Sync tables
    await sequelize.sync({ alter: false });
    console.log('Database synced');

    // Express
    const app = createApp();
    app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
