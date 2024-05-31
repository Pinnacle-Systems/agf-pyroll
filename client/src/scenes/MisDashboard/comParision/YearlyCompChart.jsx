import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetYearlyCompQuery } from '../../../redux/service/misDashboardService';
import { height } from '@amcharts/amcharts4/.internal/core/utils/Utils';

const YearlyComChart = () => {
    const { data: comparisionData } = useGetYearlyCompQuery({ params: {} });
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
            type: 'line',
            height: 500,
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
                    return this.value.toLocaleString(); // Display full value without abbreviation
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
            line: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
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
        <div style={{ flex: '66%', minWidth: '66%' }} className='flex flex-col'>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { minWidth: '70%', } }}
            />

        </div>
    );
};

export default YearlyComChart;
