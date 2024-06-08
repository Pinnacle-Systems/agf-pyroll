import React from 'react';
import { useGetShortShipmantRatioQuery } from '../../../redux/service/misDashboardService';
import 'tailwindcss/tailwind.css';

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

const ShortShipmentRatio = () => {
    const { data: shipmentData, error, isLoading } = useGetShortShipmantRatioQuery({ params: {} });
    const shipData = shipmentData?.data ? shipmentData.data : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;



    return (
        <div className='h-full overflow-scroll'>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>

                        <th className="py-1 px-2 border ">Order No</th>
                        <th className="py-1 px-2 border ">Order Qty</th>
                        <th className="py-1 px-2 border ">Ship Qty</th>
                        <th className="py-1 px-2 border ">Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {shipData.map((item, index) => (
                        <tr key={index}>

                            <td className="py-1 px-2 border text-sm">{item.orderNo}</td>
                            <td className="py-1 px-2 border text-right text-sm">{(item.orderQty).toLocaleString()}</td>
                            <td className="py-1 px-2 border text-right text-sm">{parseFloat(item.shipQty).toLocaleString()}</td>
                            <td className="py-1 px-2 border text-right text-sm">{parseFloat(item.diffrence).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShortShipmentRatio;
