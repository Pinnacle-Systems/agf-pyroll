import { Router } from 'express';

import { get, getArticleId, getFinYr, getSupplier, getSuppEfficency, getTopItems, getMonthlyReceivables } from '../services/poData.service.js'

const router = Router();

router.get('/', get);

router.get('/getFinYr', getFinYr)

router.get('/getSupplier', getSupplier)

router.get('/getArticleId', getArticleId)

router.get('/getSuppEfficency', getSuppEfficency)

router.get('/getTopItems', getTopItems)

router.get('/getMonthlyReceivables', getMonthlyReceivables)

export default router;