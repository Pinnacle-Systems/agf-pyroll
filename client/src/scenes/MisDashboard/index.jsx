import React from 'react'
import NumericCard from '../../components/NumericCard'
import PieChartTemplate from '../../components/PieChartTemplate'

const MisDashboard = () => {
    const ordersInHandBuyerWise = [
        { buyer: "Wal Mart", value: 122654 },
        { buyer: "Amazon", value: 6587452 },
        { buyer: "FlipCart", value: 9875411 },
    ]
    return (
        <div className='h-full w-full overflow-auto px-2'>
            <div className='bg-[#ADB612] h-[30px]'></div>
            <div className='h-[25%]'>
                <NumericCard />
            </div>
            <div className='grid grid-cols-3 p-5 h-[50%] gap-4 mb-4'>
                <div className='border-[#E0E0E0] p-2 h-full flex items-center justify-center w-full'>
                    <PieChartTemplate data={ordersInHandBuyerWise} valueField='value' categoryField='buyer' />
                </div>
            </div>
        </div>
    )
}

export default MisDashboard