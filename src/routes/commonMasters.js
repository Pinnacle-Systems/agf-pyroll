import { Router } from 'express';

import { get, getBuyer, getMonthData } from '../services/commonMasters.service.js';

const router = Router();

router.get('/', get);

router.get('/getBuyer', getBuyer)

router.get('/getMonth', getMonthData)
export default router;