import React from 'react'


import DenseTable from '../../components/StatBox'
import PieActiveArc from '../../components/ArcPieChart'
import { useGetMonthlyReceivablesQuery, useGetSuppEfficencyQuery } from '../../redux/service/poData'
import { useGetTopItemsQuery } from '../../redux/service/poData'
import SortedBarChart from '../../components/SortedBarChart'
import StackedBarChart from '../../components/StackedBarChart'

const PageOne = () => {
    const { data } = useGetSuppEfficencyQuery()
    const { data: topItem } = useGetTopItemsQuery()
    const { data: monthlyreceivable } = useGetMonthlyReceivablesQuery()
    const suppEfficiency = data?.data || [];
    const topItems = topItem?.data || [];
    const monthlyReceivables = monthlyreceivable?.data || []
    return (
        <div className='bg-gray-200'>
            <div className='grid grid-cols-3 w-full '>
                <div className='w-[98%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>Top Items</h1>
                    <div className=' '><SortedBarChart topItems={topItems} /></div>
                </div>
                <div className='w-[98%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg'>Supplier Efficiency</h1>
                    <div className=''>< PieActiveArc suppEfficiency={suppEfficiency} /></div>
                </div>
                <div className='w-[98%] m-3  bg-white rounded'>
                    <div className=''><StackedBarChart monthlyReceivables={monthlyReceivables} /></div>
                </div>
                <div className='w-[98%] m-3  bg-white rounded '><DenseTable /></div>

            </div>
        </div>
    )
}

export default PageOne