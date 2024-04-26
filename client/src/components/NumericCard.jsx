import React from 'react'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

const NumericCard = () => {
    const data = [
        {
            name: "Revenue",
            borderColor: "#1F588B",
            value: "$1061 M",
            previousValue: "$960 M",
            change: "14.61%",
            trend: <span className='text-green-500'> <FaArrowAltCircleUp /> </span>
        }, {
            name: "Profit",
            borderColor: "#62AAA3",
            value: "$192,13 M",
            previousValue: "$183.61 M",
            change: "+4.43%",
            trend: <span className='text-green-500'> <FaArrowAltCircleUp /> </span>
        },
        {
            name: "New Customers",
            borderColor: "border-[#96A669]",
            value: "11,918",
            previousValue: "10,719",
            change: "11.21%",
            trend: <span className='text-red-500'> <FaArrowAltCircleDown /> </span>
        },
        {
            name: "Customer Satisfaction",
            borderColor: "border-[#D49B37]",
            value: "93.13 %",
            previousValue: "79.82 %",
            change: "14.29%",
            trend: <span className='text-green-500'> <FaArrowAltCircleUp /> </span>
        },
    ]
    return (
        <div className='flex justify-around w-full '>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-[170px] text-center border border-gray-200'>
                    <div className='bg-[#F2F2F1] rounded-xs h-[20%] border-2 border-[#E0E0E0] text-gray-800'>
                        <span className='text-xl font-extralight text-black'>{val.name}</span>
                    </div>
                    <div className='h-[80%] p-2'>
                        <div className={`h-full grid items-center  p-1 bg-white border-4 cuttedBorder${i + 1}`}
                        >
                            <div>
                                <span className='text-3xl font-bold'>
                                    {val.value}
                                </span>
                            </div>
                            <div className='flex justify-between text-gray-800 text-sm'>
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