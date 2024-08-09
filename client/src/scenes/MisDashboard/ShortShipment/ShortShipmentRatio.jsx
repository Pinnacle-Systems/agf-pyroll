import React, { useEffect, useState } from 'react';
import { useGetShortShipmantRatioQuery } from '../../../redux/service/misDashboardService';
import 'tailwindcss/tailwind.css';
import { HiOutlineRefresh } from 'react-icons/hi';
import DropdownCom from '../../../Ui Component/modelParam';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../../redux/service/commonMasters';
import { currentDate } from '../../../utils/hleper';
import DropdownDt from '../../../Ui Component/dropDownParam';

const groupByCustomer = (shipData) => {
    return shipData.reduce((acc, item) => {
        const customer = item.customer; // Assuming 'customer' is the correct field
        if (!acc[customer]) {
            acc[customer] = [];
        }
        acc[customer].push(item);
        return acc;
    }, {});
};

const getProgressBarStyle = (percentage) => {
    const isPositive = percentage >= 0;
    const value = Math.abs(percentage);
    return {
        width: `${value}%`,
        backgroundColor: isPositive ? 'green' : 'red',
        float: isPositive ? 'left' : 'right',
        height: '100%',
    };
};

const ShortShipmentRatio = () => {
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [category, setCategory] = useState('Birthday');
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const { data: month } = useGetMonthQuery({ params: { filterYear: selectedYear || '', filterBuyer: selectedBuyer || '' } })
    const { data: year } = useGetFinYearQuery({})

    useEffect(() => {
        if (buyer?.data || month?.data) {
            const buyerName = (buyer?.data ? buyer?.data : []).map((item) => item.buyerName);
            const monData = (month?.data ? month?.data : []).map((mon) => mon.month);
            const finYearData = (year?.data ? year?.data : []).map((year) => year.finYear)
            setBuyerNm(buyerName);
            setMonthData(monData);
            setYearData(finYearData)
        }
    }, [buyer, month, year]);

    const { data: shipmentData, error, isLoading, refetch } = useGetShortShipmantRatioQuery({ params: { filterCat: category } });
    const shipData = shipmentData?.data ? shipmentData.data : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(category, 'cat');
    const handleOptionChange = (e) => {
        setCategory(e.target.value)
    }
    return (
        <div className='h-[350px] overflow-scroll '>
            <div className="flex  w-[100%] justify-end ">
                <div className='flex gap-2 items-center justify-center'>
                    <label htmlFor="input">Birthday :</label>
                    <input type="radio"
                        id="Birthday"
                        name='view'
                        value='Birthday'
                        checked={category === 'Birthday'}
                        onChange={handleOptionChange} />

                    <label htmlFor="input">Work Anniversary:</label>
                    <input type="radio"
                        id="Anniversary"
                        name='view'
                        value='Anniversary'
                        checked={category === 'Anniversary'}
                        onChange={handleOptionChange} />
                </div>
                <div className='flex group relative justify-end'>
                    <button
                        className='bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                        onClick={() => refetch()}
                    >
                        <HiOutlineRefresh />
                    </button>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-5 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0'>
                        Refresh
                    </span>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-200 h-full">
                <thead>
                    <tr>
                        <th className="py-1 px-2 border font-medium text-sm">S No</th>
                        <th className="py-1 px-2 border font-medium text-sm">Id Card</th>
                        <th className="py-1 px-2 border font-medium text-sm">Name</th>
                        <th className="py-1 px-2 border font-medium text-sm">Company</th>
                        <th className="py-1 px-2 border font-medium text-sm">DOB</th>
                        <th className="py-1 px-2 border font-medium text-sm">DOJ</th>
                        <th className="py-1 px-2 border font-medium text-sm">Exp</th>


                    </tr>
                </thead>
                <tbody>
                    {shipData.map((item, index) => (
                        <tr key={index}>
                            <td className="py-1 px-2 border text-[12px]">{index + 1}</td>
                            <td className="py-1 px-2 border text-[12px]">{item.idCard}</td>
                            <td className="py-1 px-2 border text-left text-[12px]">{item.name}</td>
                            <td className="py-1 px-2 border text-center text-[12px]">{item.customer}</td>
                            <td className="py-1 px-2 border text-center text-[12px]">{currentDate(item.dob)}</td>
                            <td className="py-1 px-2 border text-center text-[12px]">{currentDate(item.doj)}</td>
                            <td className="py-1 px-2 border text-center text-[12px]">{item.exp}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShortShipmentRatio;
