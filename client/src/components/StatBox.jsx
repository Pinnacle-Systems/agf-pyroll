import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const MyChartComponent = ({ monthlyReceivables }) => {

  const categories = monthlyReceivables.map(item => item.month);


  const seriesData = monthlyReceivables.map(item => ({
    name: item.suppliers.map(supp => supp.supplier),
    data: item.suppliers.map(supp => supp.noOfQty)
  }));


  const options = {
    series: seriesData,
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
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
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [options, monthlyReceivables]);

  return <div id="chart" />;
};

export default MyChartComponent;
