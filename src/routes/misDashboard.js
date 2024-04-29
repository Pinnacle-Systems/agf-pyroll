import { Router } from 'express';

import { get, getOrdersInHand, getOrdersInHandMonthWise } from '../services/misDashboard.service.js';

const router = Router();

router.get('/', get);

router.get('/ordersInHand', getOrdersInHand);

router.get('/ordersInHandMonthWise', getOrdersInHandMonthWise);

export default router;