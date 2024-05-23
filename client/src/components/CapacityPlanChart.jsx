import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ capPlanData }) => {
    const colors = ['#4d7c0f'];
    const lowBookings = Math.min(...capPlanData.map(item => item.booked));
    console.log(lowBookings, 'low');
    const options = {
        chart: {

            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        colors: capPlanData.map(item => (item.booked > item.capacity ? '#FF0000' : item.booked <= lowBookings ? '#000000' : colors[capPlanData.indexOf(item) % colors.length])),
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: capPlanData.map(item => item.month),
            labels: {
                style: {

                    fontSize: '12px'
                }
            }
        }
    };

    const series = [
        {
            name: 'Booked',
            data: capPlanData.map(item => ({
                x: item.month,
                y: item.booked,
                low: item.booked <= lowBookings,
                high: item.booked > item.capacity
            }))
        }
    ];
    return (
        <div>
            <div id="chart" className='h-full'>
                <div className='flex items-center justify-center pt-0 gap-5'>
                    <span className='text-red-600 text-lg'>
                        Overflow</span><span className='text-lime-700 text-lg'>
                        Average</span><span className='text-black-600 text-lg'>
                        low</span></div>
            </div>
            <ReactApexChart options={options} series={series} type="bar" height={400} />

            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
