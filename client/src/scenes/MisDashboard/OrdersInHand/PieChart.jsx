import React from 'react'
import PieChartTemplate from '../../../components/PieChartTemplate'
import { useGetMisDashboardOrdersInHandQuery } from '../../../redux/service/misDashboardService'

const PieChart = () => {
    const { data } = useGetMisDashboardOrdersInHandQuery({})
    const ordersInHandBuyerWise = data?.data || [];
    return (
        <div className='w-full h-full mt-2'>
            <PieChartTemplate id={`mis-ordersinhand${Math.random()}`} data={ordersInHandBuyerWise} valueField='value' categoryField='buyer' />
        </div>
    )
}

export default PieChart