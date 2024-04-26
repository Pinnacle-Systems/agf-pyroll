import React, { useState } from 'react';
import PoRegister from './poRegister';
import PoParameters from './poParameters';
import Header from './header'; // Import the Header component
import ChartsOverviewDemo from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import PieCharts from '../../components/PieChart';
import ChartsOverviewDemo1 from '../../components/PieChart';

const Index = () => {
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([])
  const [date, setDate] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState([])
  const [selectedArticleId, setSelectedArticleId] = useState([])
  return (
    <div className='h-full w-full overflow-scroll'>
      <div className='w-full h-[7%] '>
        <Header setYear={setYear} year={year} setMonth={setMonth} month={month} setDate={setDate} date={date} />
      </div>
      {console.log(date, 'date')}
      <div className='flex w-[100%] h-[100%] pl-2' >
        <div className='w-[80%] h-full '>
          <PoRegister year={year} month={month} data={date} selectedSupplier={selectedSupplier} selectedArticleId={selectedArticleId} />
        </div>
        <div className='w-[20%] h-full '>
          <PoParameters selectedSupplier={selectedSupplier} setSelectedSupplier={setSelectedSupplier} selectedArticleId={selectedArticleId} setSelectedArticleId={setSelectedArticleId} />
        </div>

      </div>
      <div className='h-full flex justify-between w-full'>
        <div className='w-full'><ChartsOverviewDemo /></div>
        <div className='w-full'><ChartsOverviewDemo1 /></div>


      </div>
    </div>
  );
}

export default Index;
