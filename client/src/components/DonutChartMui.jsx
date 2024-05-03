import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';

const FunnelChart = ({ topSupplierLastTrurnOver }) => {
    useEffect(() => {
        if (!topSupplierLastTrurnOver) {
            console.error('No data provided for the funnel chart.');
            return;
        }

        const root = am5.Root.new('chart', {
            logo: false, // Hide the logo
        });
        const chart = root.container.children.push(
            am5percent.SlicedChart.new(root, {
                layout: root.verticalLayout,
            })
        );

        const series = chart.series.push(
            am5percent.FunnelSeries.new(root, {
                alignLabels: false,
                orientation: 'vertical',
                valueField: 'value',
                categoryField: 'category',
            })
        );

        // Tooltip configuration
        const tooltip = am5.Tooltip.new(root, {
            pointerOrientation: 'vertical',
        });
        series.tooltip = tooltip;

        series.slices.template.setAll({
            strokeOpacity: 0,
            fillGradient: am5.LinearGradient.new(root, {
                rotation: 0,
                stops: [{ brighten: -0.4 }, { brighten: 0.4 }, { brighten: -0.4 }],
            }),
        });

        series.labels.template.setAll({
            truncate: true,
            maxWidth: '100%',
            fill: am5.color('#ffffff'),
            fontSize: 12,
        });

        if (Array.isArray(topSupplierLastTrurnOver)) {
            series.data.setAll(
                topSupplierLastTrurnOver.map(item => ({
                    value: item.amount,
                    category: item.supplier,
                    tooltipText: `${item.supplier}: ${item.amount}`,
                }))
            );
        }

        series.appear();
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [topSupplierLastTrurnOver]);

    return <div id="chart" style={{ width: '100%', height: '300px' }} />;
};

export default FunnelChart;
