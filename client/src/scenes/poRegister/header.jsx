import { useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYrQuery } from '../../redux/service/poData';

const Header = ({ setYear, year, setMonth, month, setDate, }) => {
    const [fromDate, setFromDate] = useState([])
    const [toDate, setToDate] = useState([])
    console.log(' state:', month);
    const monthData = [{ id: 1, month: 'JAN' }, { id: 2, month: 'FEB' }, { id: 3, month: 'MAR' }, { id: 4, month: 'APR' }, { id: 5, month: 'MAY' }, { id: 6, month: 'JUN' }, { id: 7, month: 'JUL' }, { id: 8, month: 'AUG' }, { id: 9, month: 'SEP' }, { id: 10, month: 'OCT' }, { id: 11, month: 'NOV' }, { id: 12, month: 'DEC' }]
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


    return (
        <div className=' flex text-center align-center top-Bar'>
            <div className='flex justify-between w-full '>  <div className='flex  h-8  cursor-pointer align-center mt-3 px-2'>
                <p className=' text-white subheading-font font-semibold mr-2'> Year : </p>
                {(finYear?.data ? finYear.data : []).map((item, index) => (
                    <button
                        className={`flex  rounded-[5px] px-[2px] h-6 hover:bg-green-200 mr-2 text-sm ${year.includes(item.finYr) ? 'select-clr' : 'bg-white'}`}

                        onClick={() => handleSelectYear(item)}
                        key={index}
                    >
                        {item.finYr}
                    </button>
                ))}
            </div>
                <ul className='flex   mt-2 cursor-pointer mr-2'>
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
                </ul>

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
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </div> <div className='flex items-center'> <label className='subheading-font font-semibold text-white subheading-font font-semibold mr-1'>To :</label >  <input
                    class=" h-6  w-[8rem]  text-xs leading-tight text-gray-700 border rounded shadow  focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="date"
                    placeholder="search"
                    value={fromDate}
                    onChange={(e) => { setDate(e.target.value) }}
                /></div>
                    <button className='bg-white mr-2 rounded px-1 '>Apply</button></div>
            </div></div>
    )
}

export default Header