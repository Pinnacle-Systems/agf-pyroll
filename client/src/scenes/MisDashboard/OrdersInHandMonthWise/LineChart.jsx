import React from 'react'
import { useGetMisDashboardOrdersInHandMonthWiseQuery } from '../../../redux/service/misDashboardService'
import Lchart from '../../../components/LineChart';

const LineChart = () => {
    const { data } = useGetMisDashboardOrdersInHandMonthWiseQuery({})
    const ordersInHandMonthWise = data?.data || [];
    return (
        <div className='w-full mt-5 h-full'>
            <Lchart xAxisData={ordersInHandMonthWise.map(i => `${i.date}`)} series1Data={ordersInHandMonthWise.map(i => parseInt(i.planned))} series2Data={ordersInHandMonthWise.map(i => parseInt(i.actual))} />
        </div>
    )
}

export default LineChart