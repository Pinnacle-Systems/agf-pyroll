import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetFinYrQuery } from "../redux/service/poData";

export default function DropdownDt({ selectedYear, setSelectedYear, options }) {




    return (
        <div className="card flex justify-end items-center">
            <Dropdown
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.value)}
                options={options}
                placeholder={``}
                className="w-full  "
                style={{ backgroundColor: 'white', borderRadius: '2px', width: '4.5rem', fontSize: '12px', display: 'flex', flexDirection: 'flex-end' }}
                panelClassName="dropdown-panel-black"
                optionLabel={(option) => (
                    <span style={{ backgroundColor: 'white' }}>{option.name}</span>
                )}
            />
        </div>
    );
}
