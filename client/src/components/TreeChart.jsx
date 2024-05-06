import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const TreeMapChart = ({ overAllSuppCon }) => {
    console.log(overAllSuppCon, 'overAllSuppCon');

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const [chartOptions, setChartOptions] = useState({
        series: [],
        legend: { show: false },
        chart: { height: 350, type: 'treemap' },
        tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                const { fullX, y } = w.config.series[seriesIndex].data[dataPointIndex];
                return `<div>${fullX}: ${y}</div>`; // Customize tooltip content here
            },
        },
        colors: [
            '#3B93A5',
            '#F7B844',
            '#ADD8C7',
            '#EC3C65',
            '#CDD7B6',
            '#C1F666',
            '#D43F97',
            '#1E5D8C',
            '#421243',
            '#7F94B0',
            '#EF6537',
            '#C0ADDB',
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
            },
        },
        dataLabels: {
            style: {
                colors: ['black'],

            },
        },
    });

    useEffect(() => {
        if (overAllSuppCon && overAllSuppCon.length > 0) {
            const data = overAllSuppCon.map(item => ({
                x: truncateText(item.supplier, 10), // Adjust the number based on your desired length
                y: item.poQty,
                fullX: item.supplier, // Store the full supplier name for tooltip
            }));

            setChartOptions(prevOptions => ({
                ...prevOptions,
                series: [{ data }],
            }));
        }
    }, [overAllSuppCon]);

    return (
        <div id="chart" >
            <Chart options={chartOptions} series={chartOptions.series} type="treemap" height={350} className='text-black' />
        </div>
    );
};

export default TreeMapChart;
