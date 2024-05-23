import React, { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import ApexChart from '../../components/negativeValChart'
import CardWrapper from '../../components/CardWrapper'
import GeographyChart from '../../components/GeographyChart'

import { GoogleGaugeChart, GoogleGuageChart } from '../../components/GoogleGuageChart'
import NegativeChart from '../../components/negativeValChart'
import { useGetCapPlanDataQuery, useGetFabStsDataQuery, useGetProfitLossDataQuery, useGetYFActVsPlnQuery } from '../../redux/service/orderManagement'
import Scene from '../../components/loader/Loader'

import CapacityPlanner from '../../components/CapacityPlanChart'

import FabStsChart from '../../components/FabStatusChart'
import ChartTable from './ChartTableCombo'
import DropdownData from '../../Ui Component/modelUi'

const OrderManagement = () => {
    const { data: proLsData, isLoading: isPlLoading } = useGetProfitLossDataQuery({ parama: {} })
    const { data: capPlaData, isLoading: isCapPlanLoading } = useGetCapPlanDataQuery({ parama: {} })
    const { data: fabSts, isLoading: isFabStsLoading } = useGetFabStsDataQuery({ parama: {} })
    const [selectedYear, setSelectedYear] = useState('');
    const profitLossData = useMemo(() => proLsData?.data ? proLsData?.data : [], [proLsData])
    const capcityPlaData = useMemo(() => capPlaData?.data ? capPlaData?.data : [], [capPlaData])

    const fabricSts = useMemo(() => fabSts?.data ? fabSts?.data : [], [fabSts])

    const [plData, setPlData] = useState(null)
    const [capPlanData, setCapPlanData] = useState(null)
    const [fabStatus, setFabStatus] = useState(null)

    useEffect(() => {
        if (!isPlLoading) {
            setPlData(profitLossData)
        }
        if (!isCapPlanLoading) {
            setCapPlanData(capcityPlaData)
        }
        if (!isFabStsLoading) {
            setFabStatus(fabricSts)
        }
    }, [isPlLoading, profitLossData, isCapPlanLoading, capcityPlaData, isFabStsLoading, fabricSts])

    if (!plData || isPlLoading || !capPlanData || isCapPlanLoading || !fabStatus || isFabStsLoading) {
        return <Scene />
    }

    console.log(fabStatus, 'plData');
    return (
        <div className='h-full w-full overflow-auto'>
            <div className=''> <Header /></div>
            <div className='grid grid-cols-1 h-[100%]'>
                <div><CardWrapper name={'Fabric Cost-Plan vs Actual'}><ChartTable /></CardWrapper>
                </div>
                <div className='grid grid-cols-3 pb-4'>
                    <div><CardWrapper name={'Profit & Loss Buyer Wise'}><DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} /> <NegativeChart plData={plData} /></CardWrapper></div>
                    <div className='h-full'><CardWrapper name={'Next 6 Month Production Capacity '}><CapacityPlanner capPlanData={capPlanData} /></CardWrapper></div>
                    <div><CardWrapper name={'Upcoming 3 Months Fabric Status'}><FabStsChart fabStatus={fabStatus} id={'upCommingFabSts'} /></CardWrapper></div>
                </div>
            </div>
        </div>
    )
}

export default OrderManagement
