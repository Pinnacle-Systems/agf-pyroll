import React from 'react'
import BarCharts from '../../components/BarChart'
import PieCharts from '../../components/PieChart'
import Lchart from '../../components/LineChart'
import DenseTable from '../../components/StatBox'
import PieActiveArc from '../../components/ArcPieChart'
import { useGetSuppEfficencyQuery } from '../../redux/service/poData'
const PageOne = () => {
    const { data } = useGetSuppEfficencyQuery()
    console.log(data);
    return (
        <div className='bg-gray-200'>
            <div className='grid grid-cols-3 w-full '>
                <div className='w-[90%]  m-3  bg-white rounded'><BarCharts /></div>
                <div className='w-[90%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg'>Supplier Efficiency</h1>
                    <div className=''>< PieActiveArc /></div>
                </div>


                <div className='w-[90%] m-3  bg-white rounded'><PieCharts /></div>

                <div className='w-[90%] m-3  bg-white rounded '><DenseTable /></div>    </div>  </div>
    )
}

export default PageOne