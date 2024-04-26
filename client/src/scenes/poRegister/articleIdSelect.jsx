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

    const filterData = suppData.filter(item => item.articleId.toLowerCase().includes(searchTerm.toLowerCase())); return (
        <div className="w-full h-full bg-white rounded-b-lg pb-8 ">
            <div className=' h-[100%] font-semibold  '>
                <div>
                    <input type="text" className='w-full h-7   rounded' placeholder='Items' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                {isLoading ? 'Loading ...' : <div className=' overflow-y-auto scrollbar h-full'> {(filterData ? filterData : []).map((item, index) => (
                    <div className={`hover:bg-gray-200 border rounded cursor-pointer content-font p-1 ${selectedArticleId.includes(item.articleId) ? 'select-clr' : ''}`}
                        onClick={() => handleClick(item)} key={index}>
                        {item.articleId}
                    </div>))}</div>}
            </div>
        </div>
    );
}

export default ArticleIdSelect
