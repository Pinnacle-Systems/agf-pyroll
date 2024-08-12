import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetYearlyCompQuery } from '../../../redux/service/misDashboardService';
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

    const series = years.flatMap(year => ([
        {
            name: ` Male`,
            data: categories.map(customer => {
                const order = groupedData[year].find(o => o.customer === customer);
                return order ? order.male : 0;
            })
        },
        {
            name: ` Female`,
            data: categories.map(customer => {
                const order = groupedData[year].find(o => o.customer === customer);
                return order ? order.female : 0;
            })
        }
    ]));

    const orderCount = yearlyComparision.length;

    const options = {
        chart: {
            type: 'column',
            height: 370,
            scrollablePlotArea: {
                minWidth: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 1500 : orderCount < 85 ? 2500 : orderCount < 120 ? 3000 : orderCount < 150 ? 3500 : 4000,
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
                rotation: -45,
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
                text: 'Employees on Role',
                style: {
                    fontSize: '14px'
                },
            },
            labels: {
                style: {
                    fontSize: '12px'
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
                fontSize: '12px'
            },
            formatter: function () {
                const points = this.points.map(point => {
                    return { year: point.series.name.split(' ')[0], gender: point.series.name.split(' ')[1], value: point.y };
                });

                const malePoints = points.filter(p => p.gender === 'Male');
                const femalePoints = points.filter(p => p.gender === 'Female');

                const maleDiff = malePoints.length >= 2 ? (malePoints[1].value - malePoints[0].value) : null;
                const femaleDiff = femalePoints.length >= 2 ? (femalePoints[1].value - femalePoints[0].value) : null;

                return `
                    <b>Customer: ${this.x}</b><br/>
                    ${points.map(point => `${point.year} ${point.gender}: ${point.value.toLocaleString()}`).join('<br/>')}
                    ${maleDiff !== null ? `<br/><b>Male Difference (${malePoints[1].year} - ${malePoints[0].year}):</b> ${maleDiff.toLocaleString()}` : ''}
                    ${femaleDiff !== null ? `<br/><b>Female Difference (${femalePoints[1].year} - ${femalePoints[0].year}):</b> ${femaleDiff.toLocaleString()}` : ''}
                `;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointWidth: 20, // Reduced point width for better spacing
                states: {
                    hover: {
                        pointWidth: 20
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
        <div style={{ minWidth: '100%' }} className='flex flex-col'>
            <div className='flex w-full justify-end'>
                <div className='flex group relative'>

                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-6 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                        Refresh
                    </span>
                </div>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { minWidth: '100%', minHeight: '370px' } }}
            />
        </div>
    );
};

export default YearlyComChart;
