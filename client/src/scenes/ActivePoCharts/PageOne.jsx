import React from 'react'
import BarCharts from '../../components/BarChart'
import PieCharts from '../../components/PieChart'
import Lchart from '../../components/LineChart'
import DenseTable from '../../components/StatBox'
import PieActiveArc from '../../components/ArcPieChart'
import ArcPieChart from '../../components/ArcPieChart'

const PageOne = () => {
    return (
        <div>    <h1 className='w-full text-[20px] text-center font-bold '>Charts</h1>
            <div className=' flex justify-between w-full'>
                <div className='w-full  mr-2'><BarCharts /></div>
                <div className='w-full  mr-2'><PieCharts /></div>
                <div className='w-full  mr-2'><Lchart /></div>
            </div>
            <div className='flex'>
                <div className='  m-2'></div>
                <div className='w-full  mr-2'><DenseTable /></div>   <div className='w-full  mr-2'>< ArcPieChart /></div></div></div>
    )
}

export default PageOne