import { Router } from 'express';

import { get, getActualVsBudgetValueMonthWise, getOrdersInHand, getOrdersInHandMonthWise } from '../services/misDashboard.service.js';

const router = Router();

router.get('/', get);

router.get('/ordersInHand', getOrdersInHand);

router.get('/ordersInHandMonthWise', getOrdersInHandMonthWise);
router.get('/actualVsBudgetValueMonthWise', getActualVsBudgetValueMonthWise);

export default router;