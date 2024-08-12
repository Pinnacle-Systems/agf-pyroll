import React, { useEffect, useState, useRef } from "react";
import { useGetBuyerNameQuery } from "../redux/service/commonMasters";

const DropdownCom = ({ selectedBuyer, setSelectedBuyer }) => {
    const [buyerOptions, setBuyerOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { data: buyer } = useGetBuyerNameQuery({ params: {} });
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (buyer?.data) {
            const buyerNameOptions = buyer.data.map((item) => ({
                label: item.buyerName,
                value: item.buyerName
            }));
            setBuyerOptions([{ label: "Select All", value: "select_all" }, ...buyerNameOptions]);
        }
    }, [buyer]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        if (value === "select_all") {
            if (selectedBuyer.length === buyerOptions.length - 1) {
                setSelectedBuyer([]);
            } else {
                setSelectedBuyer(buyerOptions.map(option => option.value).filter(val => val !== "select_all"));
            }
        } else {
            const newSelectedBuyer = selectedBuyer.includes(value)
                ? selectedBuyer.filter(v => v !== value)
                : [...selectedBuyer, value];
            setSelectedBuyer(newSelectedBuyer);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const isSelectAllChecked = selectedBuyer.length === buyerOptions.length - 1;

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleDropdown}
                className="bg-white border border-gray-300 rounded shadow-sm 
                  text-left flex items-center justify-end text-[12px]"
                type="button"
            >
                Company
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute  w-44 bg-white border border-gray-300
                 rounded shadow-lg z-40">
                    <div className="max-h-60 overflow-y-auto">
                        {buyerOptions.map(option => (
                            <label key={option.value} className="flex items-center hover:bg-gray-100 cursor-pointer p-1">
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={option.value === "select_all" ? isSelectAllChecked : selectedBuyer.includes(option.value)}
                                    onChange={handleOptionChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-[12px] px-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownCom;
