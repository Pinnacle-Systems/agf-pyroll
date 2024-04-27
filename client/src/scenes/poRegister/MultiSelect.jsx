import React, { useMemo, useState } from 'react'
import { useGetSupplierQuery } from '../../redux/service/poData';

const MultiSelect = ({ selectedSupplier, setSelectedSupplier }) => {
    const { data, isLoading } = useGetSupplierQuery();
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
        <div className="w-full h-full bg-white rounded-b-lg pb-8 ">
            <div className=''>
                <input type="text" className='w-full h-7    rounded' placeholder='Supplier' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
            </div>
            {isLoading ? 'Loading ...' : <div className=' overflow-y-auto scrollbar h-full'>
                {(filterData ? filterData : []).map((item, index) => (
                    <div
                        key={index}
                        className={` truncate border rounded cursor-pointer content-font font-medium  hover:bg-gray-200 p-1 ${selectedSupplier.includes(item.supplier) ? 'select-clr ' : ''}`}
                        onClick={() => handleClick(item)}
                        title={item.supplier}
                    >
                        {item.supplier}
                    </div>
                ))}
            </div>}
        </div>



    );
};

export default MultiSelect;
