import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetFinYrQuery } from "../redux/service/poData";

export default function DropdownData({ selectedYear, setSelectedYear }) {

  const [options, setOptions] = useState([]);
  const [selectLast, setSelectLast] = useState([])
  const [lastItem, setLastItem] = useState(null);
  const { data: finYr } = useGetFinYrQuery()
  const finYear = finYr?.data ? finYr.data : []
  console.log(options, 'optionsyr');
  useEffect(() => {
    const mappedOptions = finYear.map((item) => ({
      name: item.finYr,
    }));
    setOptions(mappedOptions);

    if (finYear.length > 0) {
      setLastItem(finYear[finYear.length - 1].finYr);
      if (!selectedYear) {
        setSelectedYear(finYear[finYear.length - 1].finYr);
      }
    }

    if (finYear.length > 0) {
      setSelectLast(finYear[finYear.length - 1].finYr);
      if (!selectedYear) {
        setSelectedYear(finYear[finYear.length - 1].finYr);
      }
    }
  }, [finYear]);


  return (
    <div className="card flex justify-end items-center   w-[100%] ">
      <h4 className="text-[15px]">Select:</h4>
      <Dropdown
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.value)}
        options={options}
        placeholder={`${lastItem || 'No data'}`}

        style={{ backgroundColor: 'white', borderRadius: '2px', width: '4.5rem', fontSize: '12px', display: 'flex', flexDirection: 'flex-end' }}
        panelClassName="dropdown-panel-black"
        optionLabel={(option) => (
          <span style={{ backgroundColor: 'white' }}>{option.name}</span>
        )}
      />
    </div>
  );
}
