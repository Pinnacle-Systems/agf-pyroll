import React, { useState } from 'react'
import { useGetSupplierQuery } from '../../redux/service/poData';

const MultiSelect = () => {
    const [selectedItems, setSelectedItems] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const { data: options } = useGetSupplierQuery()
    const handleItemClick = (item) => {
        const selectedIndex = selectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter((selectedItems) => selectedItems !== item));
        }
    };

    return (
        <div className="w-full h-full m-0 p-0">
            <input type="text" className='h-[10%] pb-3 w-full focus:ring-0 border-0 border-bborder-gray-400' placeholder='Supplier' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='pl-1 overflow-y-auto scrollbar h-[85%] '>
                {(options?.data ? options.data : []).map((item, index) => (
                    <div className={` border rounded cursor-pointer content-font   ${selectedItems.includes(item.supplier) ? 'bg-gray-200' : ''}`}
                        onClick={() => handleItemClick(item)} key={index}>
                        {item.supplier}
                    </div>))}
            </div>
        </div>
    );
}

export default MultiSelect
