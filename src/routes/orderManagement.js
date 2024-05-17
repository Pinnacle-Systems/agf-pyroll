import { Router } from 'express';
import { get, getCapPlanData, getFabStsData, getOcrPending, getProfitLossData, getShippedData, getWIPData } from '../services/orderManagement.service.js';




const router = Router();

router.get('/', get);

router.get('/getShippedData', getShippedData);

router.get('/getOcrPending', getOcrPending);

router.get('/getWIPData', getWIPData);

router.get('/getProfitLossData', getProfitLossData)

router.get('/getCapPlanData', getCapPlanData)

router.get('/getFabStsData', getFabStsData)


export default router;