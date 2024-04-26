import React, { useState } from "react";
import PieCharts from "../../components/PieChart";
import BarCharts from "../../components/BarChart";
import PageOne from "./PageOne";

const ActivePoCharts = () => {
    const [currentActiveTab, setCurrentActiveTab] = useState("Pie");
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
        <div className="relative w-full h-full overflow-hidden">
            <div className="flex gap-5">
                {tabs.map(tab =>
                    <div key={tab.name} className={`${(tab.name === currentActiveTab) ? "bg-gray-500 text-white" : ""}`} onClick={() => { setCurrentActiveTab(tab.name) }}>
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
