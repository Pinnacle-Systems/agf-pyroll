import React from 'react'
import OrdersInHand from './OrdersInHand'
import Header from "./Header"
import OrdersInHandMonthWise from './OrdersInHandMonthWise'
import ActualVsBudgetValueMonthWise from './ActualVsBudgetValueMonthWise'
import YearlyComparisionBuyerWise from './comParision'
import BuyerWiseRevenue from './BuyerWiseRev'
import BudgetVsActualReport from './BudgetVsActual'
import ShortShip from './ShortShipment'
const MisDashboard = () => {
    return (
        <div className='h-full w-full overflow-auto px-1'>
            <Header />
            <div className='grid grid-cols-3 gap-2 mt-2 '>
                <OrdersInHand />
                <OrdersInHandMonthWise />
                <ActualVsBudgetValueMonthWise />
            </div>
            <div className='w-full flex
            justify-center mt-2'>
                <div className='w-[100%]'> <BudgetVsActualReport /></div>
            </div>
            <div className='grid grid-cols-1 w-full overflow-scroll'>     <YearlyComparisionBuyerWise /></div>
            <div className='flex w-full h-[80%] '>   <div className='w-[50%]'><BuyerWiseRevenue /></div>
                <div className='w-[50%] h-[100%] overflow-y-scroll '><ShortShip /></div></div>
        </div>
    )
}

export default MisDashboard