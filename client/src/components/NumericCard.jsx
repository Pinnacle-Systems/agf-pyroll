import React from 'react'
import { DOWN_TREND_ICON, UP_TREND_ICON } from '../icons';
import { getDifferenceInPercentage } from '../helper/accumulation';
import CardWrapper from './CardWrapper';

const NumericCard = ({ misData }) => {

    const totalTurnOver = misData?.data?.totalTurnOver;
    const profit = misData?.data?.profit;
    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;
    const data = [
        {
            name: "Turn Over",
            borderColor: "#1F588B",
            value: `₹${(totalTurnOver?.currentValue || 0).toLocaleString()}`,
            previousValue: `₹${totalTurnOver?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(totalTurnOver?.prevValue || 0, totalTurnOver?.currentValue || 0)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Profit",
            borderColor: "#62AAA3",
            value: `₹${profit?.currentValue || 0}`,
            previousValue: `₹${profit?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(profit?.prevValue || 0, profit?.currentValue || 0)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "New Customers",
            borderColor: "border-[#96A669]",
            value: `₹${newCustomers?.currentValue || 0}`,
            previousValue: `₹${newCustomers?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(newCustomers?.prevValue || 0, newCustomers?.currentValue || 0)}%`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Top 5 Customers",
            borderColor: "border-[#D49B37]",
            value: `₹${topCustomers?.currentValue || 0}`,
            previousValue: `₹${topCustomers?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(topCustomers?.prevValue || 0, topCustomers?.currentValue || 0)}%`,
            trend: (topCustomers?.prevValue < topCustomers?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Loss",
            borderColor: "border-[#D49B37]",
            value: `₹${loss?.currentValue || 0}`,
            previousValue: `₹${loss?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(loss?.prevValue || 0, loss?.currentValue || 0)}%`,
            trend: (loss?.prevValue < loss?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
    ]
    return (
        <div className='flex justify-around w-full h-full'>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center '>
                    <CardWrapper name={val.name} >
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
                    </CardWrapper>
                </div>
            )}
        </div>

    )
}
export default NumericCard;