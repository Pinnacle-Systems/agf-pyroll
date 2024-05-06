import React from 'react'



import PieActiveArc from '../../components/ArcPieChart'
import { useGetTopFiveSuppTurnOvrQuery, useGetMonthlyReceivablesQuery, useGetSuppEfficencyQuery, useGetOverAllSupplierContributionQuery, } from '../../redux/service/poData'
import { useGetTopItemsQuery } from '../../redux/service/poData'
import SortedBarChart from '../../components/SortedBarChart'
import PieArcLabel from '../../components/DonutChartMui'
import StackedBarChart from '../../components/StackedBar'
import StockTreemapChart from '../../components/TreeChart'
import TreeMapChart from '../../components/TreeChart'
import FunnelChart from '../../components/DonutChartMui'

const PageOne = () => {
    const { data } = useGetSuppEfficencyQuery()
    const { data: topItem } = useGetTopItemsQuery()
    const { data: monthlyreceivable } = useGetMonthlyReceivablesQuery()
    const { data: threeMntTrurOver } = useGetTopFiveSuppTurnOvrQuery()
    const { data: overAllSupData } = useGetOverAllSupplierContributionQuery()
    const suppEfficiency = data?.data || [];
    const topItems = topItem?.data || [];
    const monthlyReceivables = monthlyreceivable?.data || [];
    const topSupplierLastTrurnOver = threeMntTrurOver?.data || []
    const overAllSuppCon = overAllSupData?.data || []
    return (
        <div className='bg-gray-200'>
            <div className='grid grid-cols-3 w-full '>
                <div className='w-[98%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>Top Items</h1>
                    <div className=' '><SortedBarChart topItems={topItems} /></div>
                </div>
                <div className='w-[98%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>Supplier Efficiency</h1>
                    <div className=''>< PieActiveArc suppEfficiency={suppEfficiency} /></div>
                </div>
                <div className='w-[98%] m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>Top Turnovers of Last three Month</h1>
                    <div className=''><FunnelChart topSupplierLastTrurnOver={topSupplierLastTrurnOver} /></div>
                </div>

            </div>
            <div className='w-full flex'>

                <div className='w-[98%] m-3  bg-white rounded '> <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>PO Receivable's For Next 3 Month's  </h1><StackedBarChart monthlyReceivables={monthlyReceivables} /></div>
                <div className='w-[66%]  m-3  bg-white rounded'>
                    <h1 className='text-center font-semibold text-lg bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800'>Supplier Contribution</h1>
                    <div className=''>< TreeMapChart overAllSuppCon={overAllSuppCon} /></div>
                </div></div>
        </div>
    )
}

export default PageOne