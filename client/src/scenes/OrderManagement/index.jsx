import React, { useEffect, useState } from 'react'
import Header from './Header'
import ApexChart from '../../components/negativeValChart'
import CardWrapper from '../../components/CardWrapper'
import GeographyChart from '../../components/GeographyChart'

import { GoogleGaugeChart, GoogleGuageChart } from '../../components/GoogleGuageChart'
import NegativeChart from '../../components/negativeValChart'
import { useGetCapPlanDataQuery, useGetFabStsDataQuery, useGetProfitLossDataQuery, useGetYFActVsPlnQuery } from '../../redux/service/orderManagement'
import Scene from '../../components/loader/Loader'
import ProfitLossChart from '../../components/negativeValChart'
import CapacityPlanner from '../../components/CapacityPlanChart'
import StackedBarChart from '../../components/StackedBar'
import FabStsChart from '../../components/FabStatusChart'
import ChartTable from '../../components/ChartTableCombo'

const OrderManagement = () => {
    const { data: proLsData, isLoading: isPlLoading } = useGetProfitLossDataQuery()
    const { data: capPlaData, isLoading: isCapPlanLoading } = useGetCapPlanDataQuery()
    const { data: fabSts, isLoading: isFabStsLoading } = useGetFabStsDataQuery()

    const profitLossData = proLsData?.data ? proLsData?.data : []
    const capcityPlaData = capPlaData?.data ? capPlaData?.data : []
    const fabricSts = fabSts?.data ? fabSts?.data : []
    const [plData, setPlData] = useState(null)
    const [capPlanData, setCapPlanData] = useState(null)
    const [fabStatus, setFabStatus] = useState(null)

    useEffect(() => {
        if (!isPlLoading) {
            setPlData(profitLossData)
            setCapPlanData(capcityPlaData)
            setFabStatus(fabricSts)
        }

    }, [plData, isPlLoading, capPlanData, isCapPlanLoading, fabStatus, isFabStsLoading])
    if (!plData || isPlLoading || !capPlanData || isCapPlanLoading || !fabStatus || isFabStsLoading) {
        return <Scene />
    }
    console.log(fabStatus, 'plData');
    return (
        <div className='h-full w-full overflow-auto px-1 mb-[100px]'>
            <div className=''> <Header /></div>
            <div className='grid grid-cols-1 h-[100%]
                '>
                <div><CardWrapper name={'Fabric Planned vs Actual Price'}><ChartTable /></CardWrapper></div>
                <div><CardWrapper name={'Profit & Loss Buyer Wise'}><NegativeChart plData={plData} /></CardWrapper></div>
                <div className='grid grid-cols-2'>
                    <div className='h-full'><CardWrapper name={'Next 6 Month Production Capacity '}><CapacityPlanner capPlanData={capPlanData} /></CardWrapper></div>
                    <div><CardWrapper name={'Upcomming 3 Months Fabric Status'}><FabStsChart fabStatus={fabStatus} id={'upCommingFabSts'}
                    /></CardWrapper></div>
                </div>
            </div>

        </div>
    )
}

export default OrderManagement
