import * as service from './lead.service.js';

export const createLead = async (req, res, next) => {
  try {
    const lead = await service.createLead(req.body);
    return res.status(201).json({ data: lead, message: 'Lead created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getLeadsByCity = async (req, res, next) => {
  try {
    const data = await service.getLeadsByCity();
    return res.status(200).json({ data, message: 'success' });
  } catch (error) {
    next(error);
  }
};

export const getLeadsByCampaign = async (req, res, next) => {
  try {
    const data = await service.getLeadsByCampaign();
    return res.status(200).json({ data, message: 'success' });
  } catch (error) {
    next(error);
  }
};
