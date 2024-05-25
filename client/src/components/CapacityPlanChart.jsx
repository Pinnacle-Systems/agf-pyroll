import React from 'react';
import Chart from 'react-apexcharts';

const ApexChart = ({ capPlanData }) => {
    const seriesData = capPlanData.map(item => ({
        x: item.month,
        y: item.booked,
        strokeColor: "#775DD0",
        series: [
            {
                name: 'Filled',
                value: item.capacity.toLocaleString(),
                strokeWidth: 1,
                strokeDashArray: 2,
            },
        ],
        goals: [
            {
                name: 'Capacity',
                value: item.capacity,
                strokeWidth: 1,
                strokeDashArray: 2,
                strokeColor: '#775DD0'
            }
        ],
    }));

    const options = {
        series: [
            {
                name: 'Filled',
                data: seriesData,
            },
        ],
        chart: {
            height: 450,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
            },
        },
        colors: capPlanData.map((item, index) => {
            const percentCapacity = parseFloat(item.booked) / parseFloat(item.capacity) * 100;
            if (percentCapacity > 110) return '#FF5733';
            if (percentCapacity < 100) return '#FFC107';
            if (percentCapacity > 105) return '#32CD32';
            return '#775DD0';
        }),
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;
                if (goals && goals.length) {
                    return `${val.toLocaleString()} / ${goals[0].value.toLocaleString()}`;
                }
                return val.toLocaleString();
            },
            style: {
                colors: ['#ffffff'],
            },
            background: {
                enabled: true,
                foreColor: 'grey',
                borderRadius: 2,
                dropShadow: {
                    enabled: true,
                },
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Capacity', 'Booked', 'Going To Fill', 'Over Flow'],
            markers: {
                fillColors: ['#775DD0', '#32CD32', '#FFC107', '#FF5733'],
            },
        },
    };

    return (
        <div id="chart">
            <Chart options={options} series={options.series} type="bar" height={450} />
        </div>
    );
};

export default ApexChart;
