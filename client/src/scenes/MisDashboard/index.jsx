import React from 'react'
import NumericCard from '../../components/NumericCard'
import GeographyChart from '../../components/GeographyChart'
import PieChartMui from '../../components/PieChartMui'
import DonutChartMui from '../../components/DonutChartMui'

const MisDashboard = () => {
    return (
        <div className='h-full w-full overflow-auto'>
            <NumericCard />
            <div className='grid grid-cols-3 mt-4 pl-5 h-[100px] gap-4'>
                <div className='bg-gray-300 p-3 h-full'>
                    <div className='bg-gray-400 h-full'>
                        <GeographyChart />
                    </div>
                </div>
                <div className='bg-gray-300 p-3 h-full'>
                    <div className='bg-gray-400 h-full'>
                        <DonutChartMui />
                    </div>
                </div>
                <div className='bg-gray-300 p-3 h-full'>
                    <div className='bg-gray-400 h-full'>
                        <PieChartMui />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MisDashboard