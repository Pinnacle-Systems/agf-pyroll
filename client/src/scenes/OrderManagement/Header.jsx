import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import OrderMgmtNumCard from '../../components/OrderMgmtCard';
import { useGetOcrPendingQuery, useGetOrdManagementDataQuery, useGetShippedDataQuery, useGetWIPDataQuery } from '../../redux/service/orderManagement';
import Scene from '../../components/loader/Loader';

const Header = () => {
    const [type, setType] = useState("YEAR");
    const { data: ordMgData, isLoading: isOrderDataLoading } = useGetOrdManagementDataQuery({ params: { type } });
    const { data: shipData, isLoading: isShippedDataLoading } = useGetShippedDataQuery()
    const { data: ocrPend, isLoading: isOcrPendDataLoading } = useGetOcrPendingQuery()
    const { data: WIPData, isLoading: isWIPDataLoading } = useGetWIPDataQuery()
    const [misData, setMisData] = useState(null);
    const [shippedData, setShippedData] = useState(null);
    const [ocrPendData, setOcrPendData] = useState(null)
    const [wipData, setWipData] = useState(null)

    useEffect(() => {
        if (!isOrderDataLoading && !isShippedDataLoading && !isOcrPendDataLoading && !isWIPDataLoading) {
            setMisData(ordMgData);
            setShippedData(shipData);
            setOcrPendData(ocrPend);
            setWipData(WIPData);
        }
    }, [isOrderDataLoading, isShippedDataLoading, isOcrPendDataLoading, isWIPDataLoading, ordMgData, shipData, ocrPend, WIPData]);

    if (isOrderDataLoading || isShippedDataLoading || isOcrPendDataLoading || isWIPDataLoading || !misData || !shippedData || !ocrPendData || !wipData) {
        return <Scene />;
    }

    return (
        <>
            <div className='bg-[#ADB612] h-[30px] flex justify-end overflow-x-hidden'>
                <Dropdown type={type} setType={setType} />
            </div>
            <div className=''>
                <OrderMgmtNumCard misData={misData} shippedData={shippedData} ocrPendData={ocrPendData} wipData={wipData} />
            </div>
        </>
    );
}

export default Header;
