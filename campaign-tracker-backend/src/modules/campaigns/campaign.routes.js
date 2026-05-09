import { Router } from 'express';
import * as controller from './campaign.controllers.js';
const router = Router();
router.get('/', controller.getCampaigns);
export default router;
