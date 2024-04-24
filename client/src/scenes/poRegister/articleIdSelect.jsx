import React, { useState } from 'react'
import { useGetArticleIdQuery } from '../../redux/service/poData';

const ArticleIdSelect = ({ selectedArticleId, setSelectedArticleId }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { data: options, isLoading, isFetching } = useGetArticleIdQuery()
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

            {isLoading ? 'loading' : <div className='overflow-y-auto scrollbar h-[100%] font-semibold  '>
                <input type="text" className='h-7  fixed rounded' placeholder='Items' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                {(options?.data ? options.data : []).map((item, index) => (
                    <div className={`hover:bg-gray-200 border rounded cursor-pointer content-font p-1 ${selectedArticleId.includes(item.articleId) ? 'select-clr' : ''}`}
                        onClick={() => handleClick(item)} key={index}>
                        {item.articleId}
                    </div>))}
            </div>}
        </div>
    );
}

export default ArticleIdSelect
