import { Router } from 'express';
import * as controller from './location.controllers.js';
const router = Router();
router.get('/', controller.getLocations);
export default router;
