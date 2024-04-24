import React, { useMemo, useState } from 'react'
import { useGetSupplierQuery } from '../../redux/service/poData';

const MultiSelect = ({ selectedSupplier, setSelectedSupplier }) => {
    const { data } = useGetSupplierQuery();
    const [searchItem, setSearchItem] = useState('');


    const suppData = useMemo(() => (data?.data ? data.data : []), [data]);
    const filterData = suppData.filter(item => item.supplier.toLowerCase().includes(searchItem.toLowerCase()));

    const handleClick = (item) => {
        const isSelected = selectedSupplier.includes(item.supplier);

        if (isSelected) {
            setSelectedSupplier(prev => prev.filter(supplier => supplier !== item.supplier));
        } else {
            setSelectedSupplier(prev => [...prev, item.supplier]);
        }
    };
    return (
        <div className="w-full h-full bg-white rounded-b-lg pb-2 ">
            <div className=''>            <input type="text" className='w-[15%] h-7   fixed rounded' placeholder='Supplier' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
            </div>            <div className='p-2 overflow-y-auto scrollbar h-[100%]'>
                {(filterData ? filterData : []).map((item, index) => (
                    <div
                        key={index}
                        className={`border rounded cursor-pointer content-font font-semibold hover:bg-gray-200 p-1 ${selectedSupplier.includes(item.supplier) ? 'select-clr ' : ''}`}
                        onClick={() => handleClick(item)}
                    >
                        {item.supplier}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;
