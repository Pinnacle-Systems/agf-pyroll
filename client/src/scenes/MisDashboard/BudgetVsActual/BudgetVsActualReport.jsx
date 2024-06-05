import React, { useEffect, useState } from 'react';
import { useGetBudgetVsActualQuery } from '../../../redux/service/misDashboardService';
import DropdownCom from '../../../Ui Component/modelParam';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../../redux/service/commonMasters';

const ComparisonTableWithProgressBar = () => {
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('2022');
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const { data: month } = useGetMonthQuery({ params: { filterYear: selectedYear || '', filterBuyer: selectedBuyer || '' } });
    const { data: year } = useGetFinYearQuery({});
    console.log(year, 'finyr');
    const { data: actualVsBuget } = useGetBudgetVsActualQuery({ params: {} });
    const budgetVsActualData = actualVsBuget?.data || [];

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

    const [searchValues, setSearchValues] = useState({
        orderNo: '',
        customer: '',
        plannedPrice: '',
        actualPrice: '',
    });

    const valueFormatter = (value) => {
        const formattedValue = parseFloat(value ? value : 0).toFixed(2);
        return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Grouping data by order number and customer
    const groupedOrders = budgetVsActualData.reduce((acc, order) => {
        const key = `${order.orderNo}-${order.customer}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(order);
        return acc;
    }, {});

    const handleSearchChange = (field, value) => {
        setSearchValues((prevSearchValues) => ({ ...prevSearchValues, [field]: value }));
    };

    return (
        <div className="flex flex-col w-full h-[64vh] pb-4">
            <div className="w-full overflow-scroll">
                <div className="flex justify-end p-1 w-[100%]">
                    <div className='flex items-center'>
                        <label className='text-sm text-center pt-[2px]'>Select :</label>
                    </div>
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
                    {console.log(yearData, 'yearData')}
                </div>
                <table className="table w-full">
                    <thead className="bg-[#ADB612]">
                        <tr>
                            <th className='w-6 text-[14px] font-semibold py-2 border border-gray-300'>S/No</th>
                            <th className='w-24 class text-[14px] font-semibold border border-gray-300'>
                                <div>Order No</div>
                            </th>
                            <th className='w-24 class text-[14px] font-semibold'>
                                <div>Customer</div>
                            </th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Type</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Yarn</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Fabric</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Acc</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>CMT</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Com Exp</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Sales</th>
                            <th className='text-[14px] font-semibold border border-gray-300 w-8'>Profit/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedOrders).map((key, index) => (
                            <React.Fragment key={key}>
                                {groupedOrders[key].map((order, subIndex) => (
                                    <React.Fragment key={`${index}-${subIndex}`}>
                                        {subIndex === 0 && (
                                            <tr className={`${(index + subIndex) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                                <td
                                                    className="text-[13px] text-black border border-gray-300 py-1"
                                                    rowSpan={2}
                                                >
                                                    {index + 1}
                                                </td>
                                                <td
                                                    className="text-[13px] text-black border border-gray-300 py-1"
                                                    rowSpan={2}
                                                >
                                                    {order.orderNo}
                                                </td>
                                                <td
                                                    className="text-[13px] text-black border border-gray-300 py-1"
                                                    rowSpan={2}
                                                >
                                                    {order.customer}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1">
                                                    Budget
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetYarn)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetFabric)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetCmt)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetAccessory)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetSales)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.budgetValue)}
                                                </td>
                                                <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                    {valueFormatter(order.actualValue - order.budgetValue)}
                                                </td>
                                            </tr>
                                        )}
                                        <tr className={`${(index + subIndex) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8">Actual</td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualYarn)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualFabric)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualCmt)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualAccessory)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualSales)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1 w-8" align="right">
                                                {valueFormatter(order.actualValue)}
                                            </td>
                                            <td className="text-[13px] text-black border border-gray-300 py-1" align="right">
                                                {valueFormatter(order.actualValue - order.budgetValue)}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonTableWithProgressBar;
