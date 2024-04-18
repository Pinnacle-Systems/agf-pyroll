import { useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYrQuery } from '../../redux/service/poData';
import LineChart from '../../components/LineChart';
const Header = ({ setYear, year, setMonth, month, setDate, date }) => {
    console.log(' state:', date);
    const monthData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const { data: finYear } = useGetFinYrQuery();
    console.log(finYear, 'finyr');
    const handleSelectYear = (item) => {
        setYear(prevState => {
            const yearIndex = prevState.indexOf(item.finYear);
            if (yearIndex === -1) {
                return [...prevState, item.finYear];
            } else {
                return prevState.filter(selectedYear => selectedYear !== item.finYear);
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
        <div className='h-full w-full flex text-center align-center color ml-1 rounded'>
            <div className='flex justify-evenly pl-2'>  <div className='flex  h-8 mt-1 cursor-pointer align-center'>
                <p className=' text-white subheading-font font-semibold mr-2 mt-2'> Year : </p>
                {(finYear?.data ? finYear.data : []).map((item, index) => (
                    <button
                        className={`flex gap-2 mr-3 mt-1 rounded-[5px] px-[2px] h-6 hover:bg-green-200  text-sm ${year.includes(item.finYr) ? 'bg-green-400' : 'bg-white'}`}

                        onClick={() => handleSelectYear(item)}
                        key={index}
                    >
                        {item.finYr}
                    </button>
                ))}
            </div>
                <ul className='flex   mt-2 cursor-pointer mr-2'>
                    <p className='subheading-font font-semibold text-white subheading-font font-semibold mr-2 mt-1'> Month :</p>
                    {monthData.map((item, index) => (
                        <li
                            className={` flex gap-2 mr-2  rounded-[5px] px-[2px] h-5 text-sm  hover:bg-green-200 mt-1 ${month.includes(item) ? 'bg-green-400' : 'bg-white'}`}
                            onClick={() => handleSelectMonth(item)}
                            key={index}
                        >

                            {item}
                        </li>

                    ))}
                </ul>

                <div className='flex items-center flex gap-5'> <div class="m-2">
                    <label className='subheading-font font-semibold text-white mr-2' for="firstName">
                        From :
                    </label>
                    <input
                        class=" h-6  w-[6rem]  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="date"
                        placeholder="search"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </div> <div className='flex items-center'> <label className='subheading-font font-semibold text-white subheading-font font-semibold mr-2'>To :</label ><input className='rounded w-[6rem] text-[12px] h-6 p-1 ' type="date" /></div></div>
            </div></div>
    )
}

export default Header