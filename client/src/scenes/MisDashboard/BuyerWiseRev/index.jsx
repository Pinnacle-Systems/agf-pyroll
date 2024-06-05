import React, { useState } from 'react'
import CardWrapper from '../../../components/CardWrapper'
import BuyerWiseRevenueGen from './BuyerWiseRevenue'
import DropdownData from '../../../Ui Component/modelUi';

const BuyerWiseRevenue = () => {
    const [selectedYear, setSelectedYear] = useState('');
    return (

        <CardWrapper name={"Buyer Wise Revenue"}>
            <DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <BuyerWiseRevenueGen selectedYear={selectedYear} />
        </CardWrapper>
    )
}

export default BuyerWiseRevenue