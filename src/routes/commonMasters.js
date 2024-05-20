import { Router } from 'express';

import { get, getBuyer } from '../services/commonMasters.service.js';

const router = Router();

router.get('/', get);

router.get('/getBuyer', getBuyer)
export default router;