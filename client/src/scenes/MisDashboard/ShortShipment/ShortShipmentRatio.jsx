import React, { useEffect, useState } from 'react';
import { useGetShortShipmantRatioQuery } from '../../../redux/service/misDashboardService';
import 'tailwindcss/tailwind.css';
import { HiOutlineRefresh } from 'react-icons/hi';
import DropdownCom from '../../../Ui Component/modelParam';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../../redux/service/commonMasters';

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
    const [selectedYear, setSelectedYear] = useState('2022');
    const [selectedMonth, setSelectedMonth] = useState('January');
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

    const { data: shipmentData, error, isLoading, refetch } = useGetShortShipmantRatioQuery({ params: { filterMonth: selectedMonth || '', filterSupplier: selectedBuyer || '', filterYear: selectedYear || '' } });
    const shipData = shipmentData?.data ? shipmentData.data : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='h-full overflow-scroll '>
            <div className="flex  w-[100%] justify-end ">
                <div className='flex items-center'>
                    <label className='text-sm text-center '>Select :</label>
                </div>
                <div>
                    <DropdownCom
                        selectedBuyer={selectedBuyer}
                        setSelectedBuyer={setSelectedBuyer}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        options={buyerNm}
                        monthOptions={monthData}
                        yearOptions={yearData}
                        columnHeaderHeight={"30"}
                    />
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
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-1 px-2 border font-medium text-sm">Order No</th>
                        <th className="py-1 px-2 border font-medium text-sm">Order Qty</th>
                        <th className="py-1 px-2 border font-medium text-sm">Ship Qty</th>
                        <th className="py-1 px-2 border font-medium text-sm">Difference</th>
                        <th className="py-1 px-2 border font-medium text-sm">Percentage</th>

                    </tr>
                </thead>
                <tbody>
                    {shipData.map((item, index) => (
                        <tr key={index}>
                            <td className="py-1 px-2 border text-sm">{item.orderNo}</td>
                            <td className="py-1 px-2 border text-right text-sm">{item.orderQty.toLocaleString()}</td>
                            <td className="py-1 px-2 border text-right text-sm">{parseFloat(item.shipQty).toLocaleString()}</td>
                            <td className="py-1 px-2 border text-right text-sm">{parseFloat(item.diffrence).toLocaleString()}</td>
                            <td className="py-1 px-2 border text-right text-sm">
                                <div className="relative h-4 w-full bg-gray-200">
                                    <div style={getProgressBarStyle(item.percentage)}></div>
                                    <span className="absolute inset-0 flex items-center justify-center text-sm text-black">
                                        {parseFloat(item.percentage).toLocaleString()}%
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShortShipmentRatio;
