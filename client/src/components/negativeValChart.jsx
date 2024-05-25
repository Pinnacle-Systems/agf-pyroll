import React from "react";
import { Chart } from "react-google-charts";

export const options = {
    allowHtml: true,
    showRowNumber: true,
    cssClassNames: {
        tableCell: 'custom-table-cell',
    },
};

export const formatters = [
    {
        type: "ArrowFormat",
        column: 1,
        options: {
            width: 300,
        },
    },
];

export function App({ plData }) {
    const data = [
        ["Customer", "Profit/Loss", "Percentage"], // Headers
        ...plData.map(item => [
            item.customer,
            item.profit,
            (item.profit / plData.reduce((total, item) => total + item.profit, 0) * 100).toFixed(2) + "%"
        ])
    ];

    return (
        <div>
            <Chart
                chartType="Table"
                width="100%"  // Set the desired width here
                height="110%"
                data={data}
                options={options}
                formatters={formatters}
            />
        </div>
    );
}

export default App;
