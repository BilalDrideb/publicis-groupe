import * as repository from './lead.repository.js';
import { createLeadSchema } from './lead.schema.js';
import { AppError } from '../../middlewares/errorHandler.js';

export const createLead = async (payload) => {
  const result = createLeadSchema.safeParse(payload);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(', ');
    throw new AppError(message, 400);
  }

  const sanitized = result.data;

  const existing = await repository.findByEmail(sanitized.email);
  if (existing) {
    throw new AppError('A lead with this email already exists', 409);
  }

  // Verify Location existence
  const location = await repository.findLocationById(sanitized.location_id);
  if (!location) {
    throw new AppError('The selected location does not exist', 404);
  }

  // Verify Campaign existence
  const campaign = await repository.findCampaignById(sanitized.campaign_id);
  if (!campaign) {
    throw new AppError('The selected campaign does not exist', 404);
  }

  const lead = await repository.create(sanitized);
  return lead;
};

export const getLeadsByCity = async () => {
  const rows = await repository.countByCity();
  return rows.map((row) => ({
    city: row.location.city_name,
    total_leads: Number(row.total_leads),
  }));
};

export const getLeadsByCampaign = async () => {
  const rows = await repository.countByCampaign();
  return rows.map((row) => ({
    campaign: row.campaign.name,
    total_leads: Number(row.total_leads),
  }));
};
