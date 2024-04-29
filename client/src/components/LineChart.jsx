import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Exporting, ExportingMenu } from '@amcharts/amcharts5/plugins/exporting';

const ColumnChart = ({ topItems }) => {
  useEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      layout: root.verticalLayout
    }));

    chart.get("colors").set("step", 3);

    // Set data
    const data = topItems.map(item => ({
      country: item.articleId,
      visits: item.poQty, // Using poQty as visits
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }));

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 50
    });

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    // Truncate labels
    if (xAxis.renderer) {
      // Use optional chaining to safely access nested properties
      xAxis.renderer?.labels?.template.set("truncate", true);
      xAxis.renderer?.labels?.template.set("maxWidth", 10); // Adjust maxWidth as needed
      xAxis.renderer?.labels?.template.set("text"); // Truncate labels to 4 characters

    }

    xRenderer.grid.template.setAll({
      location: 1
    });

    xRenderer.labels.template.setAll({
      multiLocation: 0.5
    });

    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
    }));

    // Add series
    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "visits", // Using visits as poQty
      categoryXField: "country"
    }));

    series.columns.template.setAll({
      tooltipText: "{categoryX}: {valueY}",
      width: am5.percent(90),
      tooltipY: 0,
      strokeOpacity: 0,
      templateField: "columnSettings"
    });

    series.data.setAll(data);

    // Add export menu
    const exporting = Exporting.new(root, {
      menu: ExportingMenu.new(root, {})
    });

    // Make stuff animate on load
    series.appear();
    chart.appear(1000, 100);

    // Clean up function
    return () => {
      root.dispose();
    };
  }, [topItems]); // dependency array includes topItems

  return <div id="chartdiv" style={{ width: '100%', height: '300px' }} />;
};

export default ColumnChart;
