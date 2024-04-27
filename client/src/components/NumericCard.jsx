import React from 'react'
import { useGetMisDashboardQuery } from '../redux/service/misDashboardService';
import { DOWN_TREND_ICON, UP_TREND_ICON } from '../icons';
import { getDifferenceInPercentage } from '../helper/accumulation';

const NumericCard = () => {
    const { data: misData } = useGetMisDashboardQuery({})
    const totalTurnOver = misData?.data?.totalTurnOver;
    const profit = misData?.data?.profit;
    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;
    const data = [
        {
            name: "Turn Over",
            borderColor: "#1F588B",
            value: `₹${totalTurnOver?.currentValue}`,
            previousValue: `₹${totalTurnOver?.prevValue}`,
            change: `${getDifferenceInPercentage(totalTurnOver?.prevValue, totalTurnOver?.currentValue)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Profit",
            borderColor: "#62AAA3",
            value: `₹${profit?.currentValue}`,
            previousValue: `₹${profit?.prevValue}`,
            change: `${getDifferenceInPercentage(profit?.prevValue, profit?.currentValue)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "New Customers",
            borderColor: "border-[#96A669]",
            value: `₹${newCustomers?.currentValue}`,
            previousValue: `₹${newCustomers?.prevValue}`,
            change: `${getDifferenceInPercentage(newCustomers?.prevValue, newCustomers?.currentValue)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Top 5 Customers",
            borderColor: "border-[#D49B37]",
            value: `₹${topCustomers?.currentValue}`,
            previousValue: `₹${topCustomers?.prevValue}`,
            change: `${getDifferenceInPercentage(topCustomers?.prevValue, topCustomers?.currentValue)}%`,
            trend: (topCustomers?.prevValue < topCustomers?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Loss",
            borderColor: "border-[#D49B37]",
            value: `₹${loss?.currentValue}`,
            previousValue: `₹${loss?.prevValue}`,
            change: `${getDifferenceInPercentage(loss?.prevValue, loss?.currentValue)}%`,
            trend: (loss?.prevValue < loss?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
    ]
    return (
        <div className='flex justify-around w-full h-full'>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center border border-gray-200'>
                    <div className='bg-gradient-to-b from-[#F2F2F1] rounded-xs h-[20%] border-2 border-[#E0E0E0] text-gray-800'>
                        <span className='text-[16px] font-extralight text-black'>{val.name}</span>
                    </div>
                    <div className='h-[80%] p-2'>
                        <div className={`h-full grid items-center  p-1 bg-white border-4 cuttedBorder${i + 1}`}
                        >
                            <div>
                                <span className='text-3xl font-bold'>
                                    {val.value}
                                </span>
                            </div>
                            <div className='flex justify-between text-gray-800 text-[12px]'>
                                <span>
                                    <div>Previous</div>
                                    <div>{val.previousValue}</div>
                                </span>
                                <span>
                                    <div>
                                        % Change
                                    </div>
                                    <div>
                                        {val.change}
                                    </div>
                                </span>
                                <div className='grid items-center justify-center text-center'>
                                    <div className='text-center '>Trend</div>
                                    <div className='text-sm flex items-center justify-center'>
                                        {val.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
export default NumericCard;