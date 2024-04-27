import React, { useState } from 'react'
import NumericCard from '../../components/NumericCard'
import Dropdown from '../../components/Dropdown'
import { useGetMisDashboardQuery } from '../../redux/service/misDashboardService';

const Header = () => {
    const [type, setType] = useState("YEAR");
    const { data: misData } = useGetMisDashboardQuery({ params: { type } })
    return (
        <>
            <div className='bg-[#ADB612] h-[30px] flex justify-end'>
                <Dropdown type={type} setType={setType} />
            </div>
            <div className='h-[25%]'>
                <NumericCard misData={misData} />
            </div>
        </>
    )
}

export default Header