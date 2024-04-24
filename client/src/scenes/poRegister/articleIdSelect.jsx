import React, { useState } from 'react'
import { useGetArticleIdQuery } from '../../redux/service/poData';

const ArticleIdSelect = ({ selectedArticleId, setSelectedArticleId }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { data: options } = useGetArticleIdQuery()
    console.log(options, 'option art');
    const handleClick = (item) => {
        const isSelected = selectedArticleId.includes(item.articleId);

        if (isSelected) {
            setSelectedArticleId(prev => prev.filter(articleId => articleId !== item.articleId));
        } else {
            setSelectedArticleId(prev => [...prev, item.articleId]);
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-b-lg pb-2">
            <input type="text" className='h-7  fixed rounded' placeholder='Items' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='p-2 overflow-y-auto scrollbar h-[100%] font-semibold pt-8 '>
                {(options?.data ? options.data : []).map((item, index) => (
                    <div className={`hover:bg-gray-200 border rounded cursor-pointer content-font p-1 ${selectedArticleId.includes(item.articleId) ? 'bg-green-400' : ''}`}
                        onClick={() => handleClick(item)} key={index}>
                        {item.articleId}
                    </div>))}
            </div>
        </div>
    );
}

export default ArticleIdSelect
