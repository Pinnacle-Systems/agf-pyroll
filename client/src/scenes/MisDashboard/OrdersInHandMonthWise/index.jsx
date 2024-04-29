import React from 'react'
import CardWrapper from '../../../components/CardWrapper'
import LineChart from './LineChart'

const OrdersInHandMonthWise = () => {
    return (
        <CardWrapper name={"Orders in Hand Month Wise"}>
            <LineChart />
        </CardWrapper>
    )
}

export default OrdersInHandMonthWise