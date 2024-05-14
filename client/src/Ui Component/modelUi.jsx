import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetFinYrQuery } from "../redux/service/poData";

export default function DropdownData({ selectedYear, setSelectedYear }) {

  const [options, setOptions] = useState([]);
  const [lastItem, setLastItem] = useState(null);
  const { data: finYr } = useGetFinYrQuery()
  const finYear = finYr?.data ? finYr.data : []

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
  }, [finYear]);

  return (
    <div className="card flex justify-content-center ">
      <Dropdown
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.value)}
        options={options}
        placeholder={`${lastItem || 'No data'}`}
        className="w-full md:w-15rem "
        style={{ backgroundColor: 'white', borderRadius: '2px', width: '4.5rem' }}
        panelClassName="dropdown-panel-black"
        optionLabel={(option) => (
          <span style={{ backgroundColor: 'white' }}>{option.name}</span>
        )}
      />
    </div>
  );
}
