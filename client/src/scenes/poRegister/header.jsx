import { useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYrQuery } from '../../redux/service/poData';

const Header = ({ setYear, year, setMonth, month, setDate, date, setSelectedArticleId, setSelectedSupplier }) => {
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    console.log(' state:', date);
    const monthData = [{ id: 4, month: 'APR' }, { id: 5, month: 'MAY' }, { id: 6, month: 'JUN' }, { id: 7, month: 'JUL' }, { id: 8, month: 'AUG' }, { id: 9, month: 'SEP' }, { id: 10, month: 'OCT' }, { id: 11, month: 'NOV' }, { id: 12, month: 'DEC' }, { id: 1, month: 'JAN' }, { id: 2, month: 'FEB' }, { id: 3, month: 'MAR' },]
    const { data: finYear } = useGetFinYrQuery();
    console.log(finYear, 'finyr');
    const handleSelectYear = (item) => {
        setYear(prevState => {
            const yearIndex = prevState.indexOf(item.finYr);
            if (yearIndex === -1) {
                return [...prevState, item.finYr];
            } else {
                return prevState.filter(selectedYear => selectedYear !== item.finYr);
            }
        });
    };
    const handleSelectMonth = (item) => {
        setMonth(prev => {
            const monthIndex = prev.indexOf(item)
            if (monthIndex === -1) {
                return [...prev, item]
            } else {
                return prev.filter(selectedMnt => selectedMnt !== item)
            }
        })
    }

    const onHandleClick = () => {
        setYear([]);
        setMonth([]);
        setSelectedSupplier([]);
        setSelectedArticleId([]);
    };

    return (
        <div className=' flex text-center align-center top-Bar w-full'>
            <div className='w-full flex justify-evenly'>
                <div className='flex  h-8  cursor-pointer align-center  pt-3'>
                    <p className=' text-white subheading-font font-semibold mr-2'> Year : </p>
                    {(finYear?.data ? finYear.data : []).map((item, index) => (
                        <button
                            className={`flex  rounded-[5px] px-[2px] h-5 hover:bg-green-200 mr-2 text-sm ${year.includes(item.finYr) ? 'select-clr' : 'bg-white'}`}

                            onClick={() => handleSelectYear(item)}
                            key={index}
                        >
                            {item.finYr}
                        </button>
                    ))}
                </div>
                <div>       <ul className='flex   mt-2 cursor-pointer mr-2'>
                    <p className='subheading-font font-semibold text-white subheading-font font-semibold mr-2 mt-1'> Month :</p>
                    {monthData.map((item, id) => (
                        <li
                            className={` flex gap-2 mr-2  rounded-[5px] px-[2px] h-5 text-sm  focus:bg-green-200 mt-1 ${month.includes(item.id) ? 'select-clr text-white' : 'bg-white'}`}
                            onClick={() => handleSelectMonth(item.id)}
                            key={id}
                        >
                            {item.month}
                        </li>

                    ))}
                </ul></div>

                <div className='flex items-center flex gap-5'> <div class="m-2">
                    <label className='subheading-font font-semibold text-white mr-2' for="firstName">
                        From :
                    </label>
                    <input
                        class=" h-6  w-[8rem]  text-xs leading-tight text-gray-700 border rounded shadow  focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="date"
                        placeholder="search"
                        value={fromDate}
                        onChange={(e) => { setFromDate(e.target.value) }}
                    />
                </div> <div className='flex items-center'> <label className='subheading-font font-semibold text-white subheading-font font-semibold mr-1'>To :</label >  <input
                    class=" h-6  w-[8rem]  text-xs leading-tight text-gray-700 border rounded shadow  focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="date"
                    placeholder="search"
                    value={toDate}
                    onChange={(e) => { setToDate(e.target.value) }}
                /></div>

                </div>
                <div className='rounded pt-3'>
                    <button className='rounded bg-white text-sm px-1 hover' onClick={onHandleClick}>Clear All</button>
                </div>

            </div></div>
    )
}

export default Header