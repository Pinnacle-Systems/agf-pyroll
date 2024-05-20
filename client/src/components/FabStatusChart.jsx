import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const FabStsChart = ({ fabStatus }) => {
    console.log(fabStatus, 'fabStatus');

    const seriesData = [
        {
            name: 'Received',
            data: fabStatus.map(item => item.rec || 0)
        },
        {
            name: 'Pending',
            data: fabStatus.map(item => item.pend || 0)
        }
    ];

    const categories = fabStatus.map(item => item.month);

    const [chartData, setChartData] = useState({
        series: seriesData,
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            colors: ['#16a34a', '#dc2626'],
            xaxis: {
                categories: categories,
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetX: 0,
                offsetY: 50
            },
        }
    });

    useEffect(() => {
        setChartData(prevData => ({
            ...prevData,
            series: seriesData,
            options: {
                ...prevData.options,
                xaxis: {
                    categories: categories,
                }
            }
        }));
    }, [fabStatus]);

    return (
        <div>
            <div id="html-dist">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default FabStsChart;
