import React, { useState } from 'react'
import { useGetArticleIdQuery } from '../../redux/service/poData';

const ArticleIdSelect = () => {
    const [selectedItems, setSelectedItems] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const { data: options } = useGetArticleIdQuery()
    console.log(options, 'option');
    const handleItemClick = (item) => {
        const selectedIndex = selectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter((selectedItems) => selectedItems !== item));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md w-[13rem]  h-[15rem] relative  overflow-y-auto scrollbar mb-2 ">
            <input type="text" className='h-7 w-[13rem]  fixed rounded' placeholder='Article Id' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='mt-8 pl-1'>  <ul className=''>
                {(options?.data ? options.data : []).map((item, index) => (
                    <li className={` border rounded cursor-pointer content-font   ${selectedItems.includes(item.articleId) ? 'bg-gray-200' : ''}`}
                        onClick={() => handleItemClick(item)} key={index}>
                        {item.articleId}
                    </li>))}
            </ul></div>
        </div>
    );
}

export default ArticleIdSelect
