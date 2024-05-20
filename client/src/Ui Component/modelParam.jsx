import React from "react";
import { Dropdown } from 'primereact/dropdown';

const DropdownCom = ({ selectedBuyer, setSelectedBuyer, options }) => {
    console.log(options, 'options');
    return (
        <div className="card flex justify-content-center">
            <Dropdown
                value={selectedBuyer || ''}
                onChange={(e) => setSelectedBuyer(e.value)}
                options={options}
                placeholder="Buyer"
                className="w-full md:w-15rem"
                style={{ backgroundColor: 'white', borderRadius: '2px', width: '5.5rem', fontSize: '12px' }}
                panelClassName="dropdown-panel-black"
            />
        </div>
    );
};

export default DropdownCom;
