import React from 'react'
import BarCharts from '../../components/BarChart'
import PieCharts from '../../components/PieChart'
import Lchart from '../../components/LineChart'
import DenseTable from '../../components/StatBox'
import PieActiveArc from '../../components/ArcPieChart'
import { useGetSuppEfficencyQuery } from '../../redux/service/poData'
import { useGetTopItemsQuery } from '../../redux/service/poData'
import LineChart from '../../HorizonComponents/charts/LineChart'
import SortedBarChart from '../../components/SortedBarChart'

const PageOne = () => {
    const { data } = useGetSuppEfficencyQuery()
    const { data: topItem } = useGetTopItemsQuery()
    const suppEfficiency = data?.data || [];
    console.log(topItem, 'item');
    const topItems = topItem?.data || [];
    return (
        <div className='bg-gray-200'>
            <div className='grid grid-cols-3 w-full '>
                <div className='w-[90%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg '>Top Items</h1>

                    <div className='w-[100%] '><SortedBarChart topItems={topItems} /></div>
                </div>
                <div className='w-[90%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg'>Supplier Efficiency</h1>

                    <div className=''>< PieActiveArc suppEfficiency={suppEfficiency} /></div>
                </div>


                <div className='w-[90%] m-3  bg-white rounded'>
                    <div className=''><PieCharts /></div>
                </div>
                <div className='w-[90%] m-3  bg-white rounded '><DenseTable /></div>    </div>  </div>
    )
}

export default PageOne