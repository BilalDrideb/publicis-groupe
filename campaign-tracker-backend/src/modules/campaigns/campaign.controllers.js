import * as service from './campaign.service.js';
export const getCampaigns = async (req, res, next) => {
  try {
    const data = await service.getCampaigns();
    return res.status(200).json({ data, message: 'success' });
  } catch (error) {
    next(error);
  }
};
