import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const PieChartTemplate = ({ data = [], valueField = '', categoryField = '', colorList = [], className = '', id = '' }) => {
    useEffect(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(id, am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        // chart.legend = new am4charts.Legend();
        chart.data = data;
        let series = chart.series.push(new am4charts.PieSeries3D());

        series.dataFields.value = valueField;
        series.dataFields.category = categoryField;
        series.fontSize = '9px'
        // Change the color of the pie slices
        series.colors.list = colorList.map(i => am4core.color(i.color));
        chart.logo.disabled = true;
        return () => {
            chart.dispose();
        };
    }, [data, valueField, categoryField, colorList, id]);

    return <div id={id} style={{ width: '100%', height: '100%' }} className={className}></div>;
};

export default PieChartTemplate;
