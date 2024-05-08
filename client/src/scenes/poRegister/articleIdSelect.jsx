import React, { useState, useMemo } from 'react'
import { useGetArticleIdQuery } from '../../redux/service/poData';

const ArticleIdSelect = ({ selectedArticleId, setSelectedArticleId }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, isFetching } = useGetArticleIdQuery()

    const handleClick = (item) => {
        const isSelected = selectedArticleId.includes(item.articleId);

        if (isSelected) {
            setSelectedArticleId(prev => prev.filter(articleId => articleId !== item.articleId));
        } else {
            setSelectedArticleId(prev => [...prev, item.articleId]);
        }
    };
    const suppData = useMemo(() => (data?.data ? data.data : []), [data]);

    const filterData = suppData.filter(item => item.articleId.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className="w-full h-full bg-white rounded-b-lg pb-8 ">
            <div className=''>
                <input type="text" className='w-full h-7    rounded' placeholder='Item' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {isLoading ? 'Loading ...' : <div className=' overflow-y-auto scrollbar h-full'>
                {(filterData ? filterData : []).map((item, index) => (
                    <div
                        key={index}
                        className={`w-[15rem] truncate border rounded cursor-pointer content-font font-medium p-1 ${selectedArticleId.includes(item.articleId) ? 'select-clr hover:select-clr' : 'hover:bg-gray-200'}`}
                        onClick={() => handleClick(item)}
                        title={item.articleId}
                    >
                        {item.articleId}
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default ArticleIdSelect
