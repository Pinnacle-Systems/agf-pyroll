import React, { useState } from 'react';
import PoRegister from './poRegister';
import PoParameters from './poParameters';
import Header from './header'; // Import the Header component

const Index = () => {
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([])
  const [date, setDate] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState([])
  const [selectedArticleId, setSelectedArticleId] = useState([])
  return (
    <div className='h-full w-full overflow-clip'>
      <div className='w-full h-[7%] '>
        <Header setYear={setYear} year={year} setMonth={setMonth} month={month} setDate={setDate} date={date} />
      </div>
      <div className='flex w-[100%] h-[93%] pl-2' >
        <div className='w-[80%] h-full '>
          <PoRegister year={year} month={month} data={date} selectedSupplier={selectedSupplier} selectedArticleId={selectedArticleId} />
        </div>
        <div className='w-[20%] h-full '>
          <PoParameters selectedSupplier={selectedSupplier} setSelectedSupplier={setSelectedSupplier} selectedArticleId={selectedArticleId} setSelectedArticleId={setSelectedArticleId} />
        </div>
        {console.log(selectedSupplier, 'seletitems')}
      </div>
    </div>
  );
}

export default Index;
