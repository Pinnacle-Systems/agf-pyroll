import React from 'react'
import CardWrapper from '../../../components/CardWrapper'

import ShortShipmentRatio from './ShortShipmentRatio'

const ShortShip = () => {
    return (
        <CardWrapper name={"Ship Qty vs order Qty "}>
            <ShortShipmentRatio />
        </CardWrapper>
    )
}

export default ShortShip