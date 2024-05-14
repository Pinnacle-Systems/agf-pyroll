import React from 'react'
import { DOWN_TREND_ICON, UP_TREND_ICON } from '../icons';
import { getDifferenceInPercentage } from '../helper/accumulation';
import CardWrapper from './CardWrapper';
import SiLineChart from './singlelineStackedChart';
import HorizontalBarChart from './singlelineStackedChart';
import { useEffect } from 'react';

const OrderMgmtNumCard = ({ misData }) => {


    const totalTurnOver = misData?.data.map(item => item.orders);
    const shipped = misData?.data.map(item => item?.shipDone ? item?.shipDone : 0);
    const inHand = misData?.data.map(item => item?.inHand ? item?.inHand : 0);
    const canceled = misData?.data.map(item => item?.canceled ? item?.canceled : 0);

    const profit = misData?.data?.profit;
    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;
    console.log(misData, 'total');
    const data = [
        {
            name: "Orders",
            borderColor: "#1F588B",
            value: `${(totalTurnOver || 0).toLocaleString()}`,
            previousValue: `${shipped || 0}`,
            change: `${inHand || 0}`,
            trend: `${canceled || 0}`
        }
        ,
        {
            name: "Shipped",
            borderColor: "#62AAA3",
            value: `${(profit?.currentValue || 0).toLocaleString()}`,
            previousValue: `${profit?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(profit?.prevValue || 0, profit?.currentValue || 0)}`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "P&L Pending",
            borderColor: "border-[#96A669]",
            value: `${(newCustomers?.currentValue || 0).toLocaleString()}`,
            previousValue: `${newCustomers?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(newCustomers?.prevValue || 0, newCustomers?.currentValue || 0)}`,
            trend: (totalTurnOver?.prevValue < totalTurnOver?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "On Time Delivery",
            borderColor: "border-[#D49B37]",
            value: `${(topCustomers?.currentValue || 0).toLocaleString()}`,
            previousValue: `${topCustomers?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(topCustomers?.prevValue || 0, topCustomers?.currentValue || 0)}`,
            trend: (topCustomers?.prevValue < topCustomers?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
        {
            name: "Loss",
            borderColor: "border-[#D49B37]",
            value: `${(loss?.currentValue || 0).toLocaleString()}`,
            previousValue: `${loss?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(loss?.prevValue || 0, loss?.currentValue || 0)}%`,
            trend: (loss?.prevValue < loss?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
    ]
    console.log(shipped, canceled, inHand, 'to');
    return (
        <div className='flex justify-around w-full h-full '>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center '>
                    <CardWrapper name={val.name} >
                        <div className={`h-full flex flex-col justify-between items-between  bg-white border-4 cuttedBorder${i + 1} `}>
                            <div className='h-[23%]'>
                                <span className='text-2xl font-bold'>
                                    {val.value}
                                </span>

                            </div>
                            <div className='h-[25%]'><HorizontalBarChart shipped={shipped} inHand={inHand} canceled={canceled} /></div>
                            <div className='flex justify-evenly items-center text-gray-800 text-[12px] h-[55%]'>
                                <span>
                                    <div className='text-sm'>{val.name === "Orders" ? "Shipped" : val.name === "Shipped" ? "P$L Taken" : val.name === "P&L Pending" ? "OCR Pend" : val.name === "Top 5 Customers" ? "trtrtr" : val.name}</div>
                                    <div className='text-xl font-semibold text-green-500' style={{ color: '#adb612' }}>{val.previousValue}</div>
                                </span>
                                <span>
                                    <div className='text-sm'>{val.name === "Orders" ? "WIP" : val.name === "Shipped" ? "P$L Pending" : val.name === "P&L Pending" ? "Ship Pend" : val.name === "Top 5 Customers" ? "trtrtr" : val.name}</div>
                                    <div className='text-xl font-semibold text-blue-500' style={{ color: '#7f7f7f' }}>{val.change}</div>
                                </span>
                                <div className='grid items-center justify-center text-center'>
                                    <div className='text-center text-sm'>Cancelled</div>
                                    <div className='text-xl font-semibold flex items-center justify-center text-red-500' style={{ color: '#000000' }}>
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
export default OrderMgmtNumCard;