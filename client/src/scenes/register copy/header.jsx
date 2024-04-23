import { useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYearQuery } from '../../redux/service/finYear';
import LineChart from '../../components/LineChart';
const Header = ({ setYear, year, setMonth, month, setDate, date }) => {
    console.log(' state:', date);
    const monthData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const { data: finYear } = useGetFinYearQuery();

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
        <div className=' flex flex-col text-center align-center'>
            <div className='flex justify-evenly ' >
                <div className='flex  h-8 mt-2 cursor-pointer '>
                    <p className='text-sm'> Year :</p>
                    {(finYear?.data ? finYear.data : []).map((item, index) => (
                        <button
                            className={`flex gap-2 mr-2  rounded-[5px] px-[2px] h-6 hover:bg-green-200  text-sm ${year.includes(item.finYear) ? 'bg-green-400' : 'bg-white'}`}

                            onClick={() => handleSelectYear(item)}
                            key={index}
                        >  {console.log(year.includes(item.finYear), 'item')}
                            {console.log(year, 'year')}
                            {item.finYear}
                        </button>

                    ))}
                </div>
                <ul className='flex  h-8 mt-2 cursor-pointer'>
                    <p className='text-sm'> Month :</p>
                    {monthData.map((item, index) => (
                        <li
                            className={` flex gap-2 mr-2  rounded-[5px] px-[2px] h-5 text-sm  hover:bg-green-200 ${month.includes(item) ? 'bg-green-400' : 'bg-white'}`}
                            onClick={() => handleSelectMonth(item)}
                            key={index}
                        >

                            {item}
                        </li>

                    ))}
                </ul>

                <div className='flex items-center flex gap-5'> <div class="m-2">
                    <label className='text-xs' for="firstName">
                        DATE :
                    </label>
                    <input
                        class=" h-5  w-[7rem]  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="date"
                        placeholder="search"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </div> <div className='flex items-center'> <label className='text-sm'>End Date :</label><input className='rounded w-[6rem] text-[12px] h-6 p-1 ' type="date" /></div></div>
            </div></div>
    )
}

export default Header