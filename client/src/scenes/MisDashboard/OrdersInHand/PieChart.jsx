import React, { useState } from 'react'
import PieChartTemplate from '../../../components/PieChartTemplate'
import { useGetMisDashboardOrdersInHandQuery } from '../../../redux/service/misDashboardService'
import DropdownData from '../../../Ui Component/modelUi'
import { LogarithmicScale } from 'chart.js'

const PieChart = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const { data } = useGetMisDashboardOrdersInHandQuery({ params: { filterYear: (selectedYear?.name ? selectedYear.name : selectedYear) } })
    console.log(selectedYear, 'year');


    const ordersInHandBuyerWise = data?.data || 'No orders In Hand';
    console.log(ordersInHandBuyerWise, 'order');
    return (
        <div className='w-full h-full mt-2'>
            <DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <PieChartTemplate id={`mis-ordersinhand${Math.random()}`} data={ordersInHandBuyerWise} valueField='value' categoryField='buyer' />
        </div>
    )
}

export default PieChart