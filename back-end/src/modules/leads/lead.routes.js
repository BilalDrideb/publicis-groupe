import { Router } from 'express';
import * as controller from './lead.controllers.js';

const router = Router();

router.post('/', controller.createLead);
router.get('/reports/leads-by-city', controller.getLeadsByCity);
router.get('/reports/leads-by-campaign', controller.getLeadsByCampaign);

export default router;
