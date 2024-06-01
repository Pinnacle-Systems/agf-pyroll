import React from 'react'
import CardWrapper from '../../../components/CardWrapper'
import LineChart from './LineChart'

const OrdersInHandMonthWise = () => {
    return (
        <div className=' '> <CardWrapper name={"Orders in Hand Month Wise"}>
            <LineChart />
        </CardWrapper></div>
    )
}

export default OrdersInHandMonthWise