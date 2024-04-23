import React, { useMemo, useState } from 'react'
import { useGetSupplierQuery } from '../../redux/service/poData';

const MultiSelect = ({ searchItem, setSearchItem }) => {

    const { data } = useGetSupplierQuery()
    let suppData = useMemo(() => data?.data ? data.data : [], [data])
    console.log(suppData, 'data');
    const filterData = suppData.filter(item => item.supplier.toLowerCase().includes(searchItem.toLowerCase()))
    return (
        <div className="w-full h-full bg-white rounded-b-lg pb-8">
            <input type="text" className='h-7 w-[14.75rem]fixed rounded' placeholder='Supplier' value={searchItem} onChange={(e) => { setSearchItem(e.target.value) }} />
            <div className='p-2  overflow-y-auto scrollbar h-[100%] '>
                {filterData?.map((item, index) => (
                    <div className={` border rounded cursor-pointer content-font font-semibold p-1`}
                    >
                        {item.supplier}
                    </div>))}
            </div>
        </div>
    );
}

export default MultiSelect
