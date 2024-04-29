import React from 'react'
import { useGetMisDashboardActualVsBudgetValueMonthWiseQuery } from '../../../redux/service/misDashboardService'
import Lchart from '../../../components/LineChart';

const LineChart = () => {
    const { data } = useGetMisDashboardActualVsBudgetValueMonthWiseQuery({})
    const ordersInHandMonthWise = data?.data || [];
    return (
        <div className='w-full mt-5 h-full'>
            <Lchart xAxisData={ordersInHandMonthWise.map(i => `${i.date}`)} series1Data={ordersInHandMonthWise.map(i => parseInt(i.planned))} series2Data={ordersInHandMonthWise.map(i => parseInt(i.actual))} series1Label='Budget' />
        </div>
    )
}

export default LineChart