import * as repository from './campaign.repository.js';
export const getCampaigns = () => repository.findAll();
