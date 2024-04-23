import React, { useState } from 'react'
import { useGetArticleIdQuery } from '../../redux/service/poData';

const ArticleIdSelect = () => {
    const [selectedItems, setSelectedItems] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const { data: options } = useGetArticleIdQuery()
    console.log(options, 'option art');
    const handleItemClick = (item) => {
        const selectedIndex = selectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter((selectedItems) => selectedItems !== item));
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-b-lg pb-2">
            <input type="text" className='h-7 w-[14.75rem] fixed rounded' placeholder='Items' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='p-2 overflow-y-auto scrollbar h-[100%] font-semibold pt-8 '>
                {(options?.data ? options.data : []).map((item, index) => (
                    <div className={` border rounded cursor-pointer content-font p-1 ${selectedItems.includes(item.articleId) ? 'bg-gray-200' : ''}`}
                        onClick={() => handleItemClick(item)} key={index}>
                        {item.articleId}
                    </div>))}
            </div>
        </div>
    );
}

export default ArticleIdSelect
