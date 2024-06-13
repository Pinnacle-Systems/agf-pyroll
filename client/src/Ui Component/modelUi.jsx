import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetFinYrQuery } from "../redux/service/poData";

export default function DropdownData({ selectedYear, setSelectedYear, previousYear = null, setPreviousYear = () => { } }) {
  const [options, setOptions] = useState([]);
  const [lastItem, setLastItem] = useState(null);
  const { data: finYr } = useGetFinYrQuery();
  const finYear = finYr?.data ? finYr.data : [];
  // const [previousYear, setPreviousYear] = useState(null);
  useEffect(() => {
    const mappedOptions = finYear.map((item) => ({
      name: item.finYr,
      value: item.finYr,
    }));
    setOptions(mappedOptions);

    if (finYear.length > 0) {
      const lastYear = finYear[finYear.length - 1].finYr;
      setLastItem(lastYear);

      if (!selectedYear) {
        setSelectedYear(lastYear);
      }

      const selectedIndex = finYear.findIndex(item => item.finYr === selectedYear);
      if (selectedIndex > 0) {
        const preYear = finYear[selectedIndex - 1].finYr
        console.log(preYear);
        setPreviousYear(preYear, 'pre');
      } else {
        setPreviousYear(null);
      }
    }
  }, [finYear, selectedYear, setSelectedYear]);
  console.log(previousYear, 'prev');
  return (
    <div className="flex justify-end items-center w-[100%]">
      <h4 className="text-[15px]">Select: </h4>
      <Dropdown
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.value)}
        options={options}
        placeholder={`${lastItem || 'No data'}`}
        style={{ backgroundColor: 'white', borderRadius: '2px', width: '3rem', fontSize: '12px', display: 'flex', flexDirection: 'flex-end' }}
        panelClassName="dropdown-panel-black"
        optionLabel="name" // Use the label correctly
      />
    </div>
  );
}
