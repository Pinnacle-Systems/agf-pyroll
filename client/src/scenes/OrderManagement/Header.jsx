import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import OrderMgmtNumCard from '../../components/OrderMgmtCard';
import { useGetOrdManagementDataQuery } from '../../redux/service/orderManagement';

const Header = () => {
    const [type, setType] = useState("YEAR");
    const { data: ordMgData, isLoading } = useGetOrdManagementDataQuery({ params: { type } });
    const [misData, setMisData] = useState(null);

    useEffect(() => {
        if (!isLoading && ordMgData) {
            setMisData(ordMgData);
        }
    }, [isLoading, ordMgData]);

    return (
        <>
            <div className='bg-[#ADB612] h-[30px] flex justify-end'>
                <Dropdown type={type} setType={setType} />
            </div>
            <div className='h-[25%]'>
                {misData && <OrderMgmtNumCard misData={misData} />}
                {/* Optionally, you can show a loading indicator if isLoading is true */}
                {isLoading && <div>Loading...</div>}
            </div>
        </>
    );
}

export default Header;
