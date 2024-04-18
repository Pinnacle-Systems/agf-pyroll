import React, { useState } from 'react';
import PoRegister from './poRegister';
import PoParameters from './poParameters';
import Header from './header'; // Import the Header component

const Index = () => {
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([])
  const [date, setDate] = useState([])
  return (
    <div className='ml-2 w-[88%] flex overflow-hidden'>
      <div className='flex-col '>
        <Header setYear={setYear} year={year} setMonth={setMonth} month={month} setDate={setDate} date={date} />
        <div className='flex overflow-auto w-full'>
          <div>
            <PoRegister year={year} month={month} date={date} />
          </div>
          <div>
            <PoParameters />
          </div>        </div>
      </div>
    </div>
  );
}

export default Index;
