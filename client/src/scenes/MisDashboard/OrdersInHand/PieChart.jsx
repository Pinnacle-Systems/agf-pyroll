import React, { useState } from 'react';
import PieChartTemplate from '../../../components/PieChartTemplate';
import { useGetMisDashboardOrdersInHandQuery } from '../../../redux/service/misDashboardService';
import { HiOutlineRefresh } from 'react-icons/hi';
import DropdownDt from '../../../Ui Component/dropDownParam';
import { useGetBuyerNameQuery } from '../../../redux/service/commonMasters';

const PieChart = () => {
    const [selected, setSelected] = useState();
    const { data, refetch } = useGetMisDashboardOrdersInHandQuery({ params: { filterBuyer: selected } });
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const ordersInHandBuyerWise = data?.data || 'No orders In Hand';
    const option = buyer?.data ? buyer?.data : [];

    return (
        <div className='w-full h-full  flex flex-col  items-center justify-between '>
            <div className='flex w-full justify-end'>
                <DropdownDt selected={selected} setSelected={setSelected} option={option} />
                <div className='flex  group relative'>
                    <button
                        className=' bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                        onClick={() => refetch()}>
                        <HiOutlineRefresh />
                    </button>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-6 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                        Refresh
                    </span>
                </div>
            </div>
            <div>    <PieChartTemplate id={`mis-ordersinhand${Math.random()}`} data={ordersInHandBuyerWise} valueField='value' categoryField='buyer' /></div>
        </div>
    );
}

export default PieChart;
