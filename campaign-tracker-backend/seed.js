import sequelize from './src/config/database.js';
import Location from './src/modules/locations/location.model.js';
import Campaign from './src/modules/campaigns/campaign.model.js';
import Lead from './src/modules/leads/lead.model.js';

const seed = async () => {
  try {
    await sequelize.authenticate();
    // 1. Crear Localizaciones
    const [madrid] = await Location.findOrCreate({ where: { city_name: 'Madrid' } });
    const [barcelona] = await Location.findOrCreate({ where: { city_name: 'Barcelona' } });
    const [sevilla] = await Location.findOrCreate({ where: { city_name: 'Sevilla' } });

    // 2. Crear Campañas
    const [summer] = await Campaign.findOrCreate({ where: { name: 'Summer 2026' } });
    const [blackFriday] = await Campaign.findOrCreate({ where: { name: 'Black Friday 2026' } });
    const [christmas] = await Campaign.findOrCreate({ where: { name: 'Christmas 2026' } });

    // 3. Crear Leads de prueba
    const leadsData = [
      // Leads para Summer (Total 3 | Top: Madrid)
      { full_name: 'Juan Pérez', email: 'juan@test.com', birth_date: '1990-05-15', campaign_id: summer.id, location_id: madrid.id },
      { full_name: 'Ana López', email: 'ana@test.com', birth_date: '1988-10-20', campaign_id: summer.id, location_id: madrid.id },
      { full_name: 'Carlos Ruiz', email: 'carlos@test.com', birth_date: '1995-02-10', campaign_id: summer.id, location_id: barcelona.id },

      // Leads para Black Friday (Total 3 | Top: Barcelona)
      { full_name: 'Marta Sanz', email: 'marta@test.com', birth_date: '1992-12-01', campaign_id: blackFriday.id, location_id: barcelona.id },
      { full_name: 'Pedro Gómez', email: 'pedro@test.com', birth_date: '1985-03-30', campaign_id: blackFriday.id, location_id: barcelona.id },
      { full_name: 'Lucía Villa', email: 'lucia@test.com', birth_date: '1993-07-12', campaign_id: blackFriday.id, location_id: sevilla.id },

      // Leads para Christmas (Total 3 | Top: Sevilla)
      { full_name: 'Elena Marín', email: 'elena@test.com', birth_date: '1991-08-25', campaign_id: christmas.id, location_id: sevilla.id },
      { full_name: 'Roberto Gil', email: 'roberto@test.com', birth_date: '1987-11-05', campaign_id: christmas.id, location_id: sevilla.id },
      { full_name: 'Sonia Pozo', email: 'sonia@test.com', birth_date: '1994-01-14', campaign_id: christmas.id, location_id: madrid.id },
    ];

    await Lead.destroy({ where: {} });

    await Lead.bulkCreate(leadsData);

    console.log('--- Seed exitoso ---');
    console.log('Localizaciones, Campañas y Leads creados correctamente.');

    process.exit(0);
  } catch (err) {
    console.error('Error en el seed:', err.message);
    process.exit(1);
  }
};

seed();