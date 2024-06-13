import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetYearlyCompQuery } from '../../../redux/service/misDashboardService';
import { height } from '@amcharts/amcharts4/.internal/core/utils/Utils';
import { HiOutlineRefresh } from 'react-icons/hi';

const YearlyComChart = () => {
    const { data: comparisionData, refetch } = useGetYearlyCompQuery({ params: {} });
    const yearlyComparision = comparisionData?.data ? comparisionData?.data : [];

    const groupedData = yearlyComparision.reduce((acc, curr) => {
        if (!acc[curr.year]) {
            acc[curr.year] = [];
        }
        acc[curr.year].push(curr);
        return acc;
    }, {});

    const years = Object.keys(groupedData);
    const categories = [...new Set(yearlyComparision.map(order => order.customer))];

    const series = years.map(year => ({
        name: year,
        data: categories.map(customer => {
            const order = groupedData[year].find(o => o.customer === customer);
            return order ? order.orderQty : 0;
        })
    }));
    const orderCount = yearlyComparision.length;

    const options = {
        chart: {
            type: 'column',
            height: 550,
            scrollablePlotArea: {
                minWidth: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 1500 : orderCount < 85 ? 2500 : orderCount < 120 ? 3000 : orderCount < 150 ? 3500 : 300,
                scrollPositionX: 0
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -90,
                step: 1,
                style: {
                    fontSize: '12px'
                }
            },
            scrollbar: {
                enabled: true
            },
        },
        yAxis: {
            title: {
                text: 'Order Quantity',
                style: {
                    fontSize: '10px',
                    paddingLeft: '20px'
                },
            },
            labels: {
                style: {
                    fontSize: '10px'
                },
                formatter: function () {
                    return this.value.toLocaleString();
                }
            },
        },
        tooltip: {
            shared: true,
            split: true,
            stickOnContact: true,
            style: {
                fontSize: '10px'
            },
            formatter: function () {
                const points = this.points.map(point => {
                    return { year: point.series.name, value: point.y };
                });

                const year1 = points.find(p => p.year === years[0]);
                const year2 = points.find(p => p.year === years[1]);
                const diff = year1 && year2 ? (year2.value - year1.value) : null;

                return `
                    <b>Customer: ${this.x}</b><br/>
                    ${points.map(point => `${point.year}: ${point.value.toLocaleString()}`).join('<br/>')}
                    ${diff !== null ? `<br/><b>Difference (${years[1]} - ${years[0]}):</b> ${diff.toLocaleString()}` : ''}
                `;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointWidth: 30,
                states: {
                    hover: {
                        pointWidth: 30
                    }
                },
                marker: {
                    enabled: false
                },
            }
        },
        series: series,
    };


    return (
        <div style={{ minWidth: '66%' }} className='flex flex-col'>
            <div className='flex w-full justify-end'>
                <div className='flex  group relative'>
                    <button
                        className=' bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                        onClick={() => refetch()}>
                        <HiOutlineRefresh />
                    </button>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-6 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                        Refresh
                    </span>
                </div></div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { minWidth: '70%', } }}
            />

        </div>
    );
};

export default YearlyComChart;
