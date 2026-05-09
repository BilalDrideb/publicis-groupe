import { fn, col, literal } from 'sequelize';
import Lead from './lead.model.js';
import Location from '../locations/location.model.js';
import Campaign from '../campaigns/campaign.model.js';

export const create = async (data) => {
  return Lead.create(data);
};

export const findByEmail = async (email) => {
  return Lead.findOne({ where: { email } });
};

export const findLocationById = async (id) => {
  return Location.findByPk(id);
};

export const findCampaignById = async (id) => {
  return Campaign.findByPk(id);
};

export const countByCity = async () => {
  return Lead.findAll({
    attributes: [
      [fn('COUNT', col('Lead.id')), 'total_leads'],
    ],
    include: [
      {
        model: Location,
        as: 'location',
        attributes: ['city_name'],
      },
    ],
    group: ['location.id'],
    order: [[literal('total_leads'), 'DESC']],
    raw: true,
    nest: true,
  });
};

export const countByCampaign = async () => {
  return Lead.findAll({
    attributes: [
      [fn('COUNT', col('Lead.id')), 'total_leads'],
    ],
    include: [
      {
        model: Campaign,
        as: 'campaign',
        attributes: ['name'],
      },
    ],
    group: ['campaign.id'],
    order: [[literal('total_leads'), 'DESC']],
    raw: true,
    nest: true,
  });
};
