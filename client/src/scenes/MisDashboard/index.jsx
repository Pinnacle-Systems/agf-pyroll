import React from 'react'
import OrdersInHand from './OrdersInHand'
import Header from "./Header"
import OrdersInHandMonthWise from './OrdersInHandMonthWise'
import ActualVsBudgetValueMonthWise from './ActualVsBudgetValueMonthWise'

const MisDashboard = () => {
    return (
        <div className='h-full w-full overflow-auto px-1 mb-[100px]'>
            <Header />
            <div className='grid grid-cols-2 h-[80%] gap-2 mt-2 '>
                <OrdersInHand />
                <OrdersInHandMonthWise />
            </div>
            <div className='h-[700px]'>
                <ActualVsBudgetValueMonthWise />
            </div>
        </div>
    )
}

export default MisDashboard