import React from 'react'
import OrdersInHand from './OrdersInHand'
import Header from "./Header"
import OrdersInHandMonthWise from './OrdersInHandMonthWise'
import ActualVsBudgetValueMonthWise from './ActualVsBudgetValueMonthWise'
import YearlyComparisionBuyerWise from './comParision'


const MisDashboard = () => {
    return (
        <div className='h-full w-full overflow-auto px-1 mb-[100px]'>
            <Header />
            <div className='grid grid-cols-3 h-[60%]   gap-2 mt-2 '>
                <OrdersInHand />
                <OrdersInHandMonthWise />
                <ActualVsBudgetValueMonthWise />


            </div>
            <YearlyComparisionBuyerWise />
        </div>
    )
}

export default MisDashboard