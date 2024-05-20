import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CapacityPlanner = ({ plData }) => {
    const options = {

        height: 450,
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "top"
        },
        axisY: {
            suffix: "%",
            labelFontSize: 10,
        },
        axisX: {
            interval: 1,
            labelFontSize: 10, // Decrease the label font size for x-axis
            // Rotate labels at an angle
        },
        data: [{
            type: "stackedBar100",
            color: "#65a30d",
            name: "Profit",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###",
            dataPoints: plData.map(item => ({ label: item.customer, y: item.profit })),
            barThickness: 50, // Increase the bar height by adjusting this value
            indexLabelFontSize: 10,
        }, {
            type: "stackedBar100",
            color: "#b91c1c",
            name: "Loss",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###",
            dataPoints: plData.map(item => ({ label: item.customer, y: item.loss })),
            barThickness: 50, // Increase the bar height by adjusting this value
            indexLabelFontSize: 10,
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default CapacityPlanner;
