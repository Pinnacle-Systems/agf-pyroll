import React from 'react';
import NumericCard from '../../components/NumericCard';
import DropdownCom from '../../Ui Component/modelParam';
import { HiOutlineRefresh } from 'react-icons/hi';

const Header = ({
    selectedBuyer, setSelectedBuyer,
    selectedYear, setSelectedYear,
    selectedMonth, setSelectedMonth,

    refetch, misData
}) => {
    console.log(misData, 'mis');
    return (
        <>
            <div className='bg-[#ADB612] h-[30px] flex justify-center items-center font-semibold'>
                <div className='flex group w-full justify-end relative'>
                    <div className='flex items-center'>
                        <label className='text-sm text-center'>Select :</label>

                        <div>
                            <DropdownCom
                                selectedBuyer={selectedBuyer}
                                setSelectedBuyer={setSelectedBuyer}
                                selectedMonth={selectedMonth}
                                setSelectedMonth={setSelectedMonth}
                                selectedYear={selectedYear}
                                setSelectedYear={setSelectedYear}

                                columnHeaderHeight={"30"}
                            />   </div>
                    </div>
                    <div>
                        <button
                            className='bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                            onClick={() => refetch()}>
                            <HiOutlineRefresh />
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-[25%]'>
                <NumericCard misData={misData} selectedBuyer={selectedBuyer} />
            </div>
        </>
    );
};

export default Header;
