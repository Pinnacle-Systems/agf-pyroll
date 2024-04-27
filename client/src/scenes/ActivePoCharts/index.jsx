import React, { useState } from "react";
import PieCharts from "../../components/PieChart";
import BarCharts from "../../components/BarChart";
import PageOne from "./PageOne";

const ActivePoCharts = () => {
    const [currentActiveTab, setCurrentActiveTab] = useState("Po Reports");
    const tabs = [
        {
            'name': "Po Reports",
            component: <PageOne />,
        },
        {
            'name': "Bar",
            component: <BarCharts />,
        },
    ]
    return (
        <div className="relative w-full h-full overflow-hidden ">
            <div className="flex gap-5 select-clr ">
                {tabs.map(tab =>
                    <div key={tab.name} className={`${(tab.name === currentActiveTab) ? "bg-white text-black" : ""} m-2 rounded px-1`} onClick={() => { setCurrentActiveTab(tab.name) }}>
                        {tab.name}
                    </div>
                )}
            </div>
            <div>
                {tabs.find(i => i.name === currentActiveTab)?.component}
            </div>
        </div>
    );
};

export default ActivePoCharts;
