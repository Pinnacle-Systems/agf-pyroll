/* global am4core */

import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const ArcPieChart = () => {
    useEffect(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create('chartdiv', am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        // Create legend and set its properties
        let legend = new am4charts.Legend();
        legend.fontSize = 12;
        legend.align = 'center'; // Align legend to the center of the chart
        legend.contentAlign = 'right'; // Align legend content to the left
        chart.legend = legend;

        chart.data = [
            { country: 'Lithuania', litres: 501.9 },
            { country: 'Czech Republic', litres: 301.9 },
            { country: 'Ireland', litres: 201.1 },
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

        series.labels.template.fontSize = 12; // Set label font size
        series.ticks.template.fontSize = 14;
        chart.logo.disabled = true;

        return () => {
            chart.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: '100%', height: '270px' }}></div>;
};

export default ArcPieChart;
