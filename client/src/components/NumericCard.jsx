import React from 'react'
import { DOWN_TREND_ICON, UP_TREND_ICON } from '../icons';
import { getDifferenceInPercentage } from '../helper/accumulation';
import CardWrapper from './CardWrapper';
import lab from '../assets/img/image.png'
import staff from '../assets/businessman.png'

const NumericCard = ({ misData, selectedBuyer }) => {

    const totalTurnOver = misData?.data?.totalTurnOver;
    const profit = misData?.data?.profit;
    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;
    console.log(selectedBuyer, totalTurnOver, 'br');


    const filteredTotalTurnOver = totalTurnOver?.filter(item => selectedBuyer.includes(item.comCode)) || [];
    const filterProfit = profit?.filter(item => selectedBuyer.includes(item.comCode)) || [];
    const filterNewCus = newCustomers?.filter(item => selectedBuyer.includes(item.comCode)) || [];
    const filteredTopCus = topCustomers?.filter(item => selectedBuyer.includes(item.comCode)) || [];
    const filterLoss = loss?.filter(item => selectedBuyer.includes(item.comCode)) || [];
    const data = [
        {
            heading: " Employees on Role",
            borderColor: "#1F588B",
            name: 'Total',
            valName: 'https://img.icons8.com/?size=100&id=I_5_kSloSWJW&format=png&color=000000',
            valName2: 'https://img.icons8.com/?size=100&id=23492&format=png&color=000000',
            value: `${(filteredTotalTurnOver.reduce((acc, item) => acc + item.currentValue, 0) || 0).toLocaleString()}`,
            qty: `${(filteredTotalTurnOver.reduce((acc, item) => acc + item.currentQty, 0) || 0).toLocaleString()}`,
            previousValue: `${(filteredTotalTurnOver.reduce((acc, item) => acc + item.prevValue, 0) || 0).toLocaleString()}`,
        },
        {
            heading: "Avg Monthly salary",
            borderColor: "#62AAA3",
            name: 'Total',
            valName: 'https://img.icons8.com/?size=100&id=I_5_kSloSWJW&format=png&color=000000',
            valName2: 'https://img.icons8.com/?size=100&id=23492&format=png&color=000000',
            value: `₹${(filterProfit.reduce((acc, item) => acc + item.currentValue, 0) || 0).toLocaleString()}`,
            qty: `${(filterProfit.reduce((acc, item) => acc + item.currentQty, 0) || 0).toLocaleString()}`,
            previousValue: `₹${(filterProfit.reduce((acc, item) => acc + item.prevValue, 0) || 0).toLocaleString()}`,


        },
        {
            heading: "Last Month salary",
            borderColor: "border-[#96A669]",
            name: 'Total',
            valName: 'https://img.icons8.com/?size=100&id=I_5_kSloSWJW&format=png&color=000000',
            valName2: 'https://img.icons8.com/?size=100&id=23492&format=png&color=000000',
            value: `₹${(filterNewCus.reduce((acc, item) => acc + item.currentValue, 0) || 0).toLocaleString()}`,
            qty: `${(filterNewCus.reduce((acc, item) => acc + item.currentQty, 0) || 0).toLocaleString()}`,
            previousValue: `₹${(filterNewCus.reduce((acc, item) => acc + item.prevValue, 0) || 0).toLocaleString()}`,
        },
        {
            heading: "Staffs Last Month Salary",
            borderColor: "border-[#D49B37]",
            name: 'Total',
            valName: 'https://img.icons8.com/?size=100&id=I_5_kSloSWJW&format=png&color=000000',
            valName2: 'https://img.icons8.com/?size=100&id=23492&format=png&color=000000',
            value: `₹${(filteredTopCus.reduce((acc, item) => acc + item.currentValue, 0) || 0).toLocaleString()}`,
            qty: `${(filteredTopCus.reduce((acc, item) => acc + item.currentQty, 0) || 0).toLocaleString()}`,
            previousValue: `₹${(filteredTopCus.reduce((acc, item) => acc + item.prevValue, 0) || 0).toLocaleString()}`,
        },
        {
            heading: "Labours Last Month Salary",
            borderColor: "border-[#D49B37]",
            name: 'Total',
            valName: 'https://img.icons8.com/?size=100&id=I_5_kSloSWJW&format=png&color=000000',
            valName2: 'https://img.icons8.com/?size=100&id=23492&format=png&color=000000',
            value: `₹${(filterLoss.reduce((acc, item) => acc + item.currentValue, 0) || 0).toLocaleString()}`,
            qty: `${(filterLoss.reduce((acc, item) => acc + item.currentQty, 0) || 0).toLocaleString()}`,
            previousValue: `₹${(filterLoss.reduce((acc, item) => acc + item.prevValue, 0) || 0).toLocaleString()}`,
        },
    ]
    return (
        <div className='flex justify-around w-full h-full'>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center '>
                    <CardWrapper heading={val.heading} >
                        <div className={`h-full grid items-center bg-white border-4 cuttedBorder${i + 1}`}
                        >
                            <div className='flex justify-center px-4'>
                                <div>
                                    <h1 className='text-sm font-semibold'>{val.name}</h1>
                                    <span className='text-lg font-bold'>
                                        {val.qty}
                                    </span></div>

                            </div>
                            <div className='flex justify-between px-2 text-gray-800 text-[12px]  w-full'>
                                <span className='flex flex-col items-center justify-between'>
                                    <img className='w-10 h-10 ' src={val.valName} />
                                    <div className='text-sm'>{val.previousValue}</div>
                                </span>
                                <span className='flex flex-col items-center justify-between'>
                                    <img className='w-10 h-10 ' src={val.valName2} />
                                    <div className='text-sm'>  {val.value} </div>
                                </span>

                            </div>
                        </div>
                    </CardWrapper>
                </div>
            )}
        </div>

    )
}
export default NumericCard;