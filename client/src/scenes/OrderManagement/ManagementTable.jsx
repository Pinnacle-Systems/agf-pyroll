import React from 'react';
import { useGetOrderStsBuyerWiseQuery } from '../../redux/service/orderManagement';

const DataTable = () => {
    const { data: orderSts } = useGetOrderStsBuyerWiseQuery({ params: {} });
    console.log(orderSts, 'sts');
    const buyerWiseOrdSts = orderSts?.data ? orderSts?.data : [];
    console.log(buyerWiseOrdSts, 'comData');

    // Preprocess data to group by year
    const groupedData = buyerWiseOrdSts.reduce((acc, row) => {
        const year = row.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(row);
        return acc;
    }, {});

    const renderGroupedData = () => {
        return Object.keys(groupedData).map((year, index) => {
            const rows = groupedData[year];
            return (
                <React.Fragment key={index}>
                    <tr >
                        <td rowSpan={rows.length} className="text-center align-middle border  border-black">{year}</td>
                        <td className="border border-black text-right text-xs  p-1">{rows[0].customer}</td>
                        <td className="border border-black text-right text-xs  p-1">{rows[0].orderQty}</td>
                        <td className="border border-black text-right text-xs  p-1">{rows[0].plTaken}</td>
                        <td className="border border-black text-right text-xs  p-1">{rows[0].cancelOrder}</td>
                    </tr>
                    {rows.slice(1).map((row, subIndex) => (
                        <tr key={`${index}-${subIndex}`} className='even:bg-gray-200 odd:bg-white' >
                            <td className="border border-black text-right text-xs p-1">{row.customer}</td>
                            <td className="border border-black text-right  text-xs p-1">{row.orderQty}</td>
                            <td className="border border-black text-right  text-xs p-1">{row.plTaken}</td>
                            <td className="border border-black text-right  text-xs p-1">{row.cancelOrder}</td>
                        </tr>
                    ))}
                </React.Fragment>
            );
        });
    };

    return (
        <div className='h-[100%] overflow-scroll'>
            <table className="w-[100%] border-collapse  ">
                <thead>
                    <tr>
                        <th className="border border-black p-2 text-sm font-medium">Year</th>
                        <th className="border border-black p-2 text-sm font-medium">Customer</th>
                        <th className="border border-black p-2 text-sm font-medium">Order Quantity</th>
                        <th className="border border-black p-2 text-sm font-medium">PL Taken</th>
                        <th className="border border-black p-2 text-sm font-medium">Cancel Order</th>
                    </tr>
                </thead>
                <tbody className="text-sm"> {/* Reduce font size */}
                    {renderGroupedData()}
                </tbody>
            </table></div>
    );
};

export default DataTable;
