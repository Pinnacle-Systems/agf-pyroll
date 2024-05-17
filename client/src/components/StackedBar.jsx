import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const StackedBarChart = ({ monthlyReceivables }) => {

    const categories = monthlyReceivables?.monthData || [];


    const seriesData = (monthlyReceivables?.supplierData || []).map(item => ({
        name: item.supplier,
        data: item.monthWisePoReceivable
    }));


    const options = {
        series: seriesData,
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,

                dataLabels: {
                    total: {
                        enabled: false,
                    },
                },
            },
        },
        xaxis: {
            type: 'category',
            categories: categories,
        },
        legend: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#StackedChart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [options, monthlyReceivables]);

    return <div id="StackedChart" />;
};

export default StackedBarChart;
