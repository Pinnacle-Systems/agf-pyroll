import { Router } from 'express';

import { get, getOrdersInHand } from '../services/misDashboard.service.js';

const router = Router();

router.get('/', get);

router.get('/ordersInHand', getOrdersInHand);

export default router;