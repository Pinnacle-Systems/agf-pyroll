import React from 'react'
import OrdersInHand from './OrdersInHand'
import Header from "./Header"

const MisDashboard = () => {
    return (
        <div className='h-full w-full overflow-auto px-1'>
            <Header />
            <div className='grid grid-cols-2 h-[80%] gap-2 mt-2'>
                <OrdersInHand />
            </div>
        </div>
    )
}

export default MisDashboard