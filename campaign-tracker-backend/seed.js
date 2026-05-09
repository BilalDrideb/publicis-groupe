import sequelize from './src/config/database.js';
import Location from './src/modules/locations/location.model.js';
import Campaign from './src/modules/campaigns/campaign.model.js';
import './src/modules/leads/lead.model.js'; // register associations

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Locations
    await Location.findOrCreate({ where: { city_name: 'Madrid' } });
    await Location.findOrCreate({ where: { city_name: 'Barcelona' } });
    await Location.findOrCreate({ where: { city_name: 'Sevilla' } });

    // Campaigns
    await Campaign.findOrCreate({ where: { name: 'Summer 2026' } });
    await Campaign.findOrCreate({ where: { name: 'Black Friday 2026' } });
    await Campaign.findOrCreate({ where: { name: 'Christmas 2026' } });

    console.log('Seed completed – locations and campaigns ready');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
