import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const ArcPieChart = () => {
    useEffect(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create('chartdiv', am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [
            { country: 'Lithuania', litres: 501.9 },
            { country: 'Czech Republic', litres: 301.9 },
            { country: 'Ireland', litres: 201.1 },
            { country: 'Germany', litres: 165.8 },
            { country: 'Australia', litres: 139.9 },
            { country: 'Austria', litres: 128.3 },
        ];

        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = 'litres';
        series.dataFields.category = 'country';

        // Change the color of the pie slices
        series.colors.list = [
            am4core.color('#FF5733'), // Red
            am4core.color('#FFC300'), // Yellow
            am4core.color('#36A2EB'), // Blue
            am4core.color('#4CAF50'), // Green
            am4core.color('#9B59B6'), // Purple
            am4core.color('#E74C3C'), // Dark Red
        ];
        chart.logo.disabled = true;
        return () => {
            chart.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: '80%', height: '500px' }}></div>;
};

export default ArcPieChart;
