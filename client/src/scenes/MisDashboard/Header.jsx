import React, { useState } from 'react'
import NumericCard from '../../components/NumericCard'
import Dropdown from '../../components/Dropdown'
import { useGetMisDashboardQuery } from '../../redux/service/misDashboardService';
import DropdownData from '../../Ui Component/modelUi';
import { HiOutlineRefresh } from 'react-icons/hi'

const Header = () => {

    const [selectedYear, setSelectedYear] = useState('');
    const [previousYear, setPreviousYear] = useState(null);
    const { data: misData, refetch } = useGetMisDashboardQuery({ params: {} })
    return (
        <>
            <div className='bg-[#ADB612] h-[30px] flex justify-center items-center font-semibold'>

                <div className='flex  group w-full justify-end relative'>
                    <button
                        className=' bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                        onClick={() => refetch()}>
                        <HiOutlineRefresh />
                    </button>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 right-1 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                        Refresh
                    </span>
                </div>
                {/* <DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} previousYear={previousYear} setPreviousYear={set} /> */}

            </div>
            <div className='h-[25%]'>
                <NumericCard misData={misData} />
            </div>
        </>
    )
}

export default Header