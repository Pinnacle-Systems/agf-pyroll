import React from 'react'
import CardWrapper from '../../../components/CardWrapper'
import LineChart from './LineChart'

const OrdersInHandMonthWise = () => {
    return (
        <div className=' '> <CardWrapper name={"Orders Pln Vs Act Upcomming And Completed 3 Mon"}>
            <LineChart />
        </CardWrapper></div>
    )
}

export default OrdersInHandMonthWise