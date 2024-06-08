import React, { useState } from 'react'
import CardWrapper from '../../../components/CardWrapper'
import BuyerWiseRevenueGen from './BuyerWiseRevenue'
import DropdownData from '../../../Ui Component/modelUi';
import { useGetBuyerWiseRevenueQuery } from '../../../redux/service/misDashboardService';
import { HiOutlineRefresh } from 'react-icons/hi';

const BuyerWiseRevenue = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const { data: buyerRev, refetch } = useGetBuyerWiseRevenueQuery({ params: { filterYear: (selectedYear?.name ? selectedYear.name : '' || selectedYear) } });

    return (

        <CardWrapper name={"Buyer Wise Revenue"}>

            <div className='flex w-full justify-end'>
                <DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} />                <div className='flex  group relative'>
                    <button
                        className=' bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                        onClick={() => refetch()}>
                        <HiOutlineRefresh />
                    </button>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-6 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                        Refresh
                    </span>
                </div></div>
            <BuyerWiseRevenueGen buyerRev={buyerRev} />
        </CardWrapper>
    )
}

export default BuyerWiseRevenue