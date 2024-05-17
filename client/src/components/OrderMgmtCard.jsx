import React from 'react'
import { DOWN_TREND_ICON, UP_TREND_ICON } from '../icons';
import { getDifferenceInPercentage } from '../helper/accumulation';
import CardWrapper from './CardWrapper';

import CanvasJSReact from '@canvasjs/react-charts';


const OrderMgmtNumCard = ({ misData, shippedData, ocrPendData, wipData }) => {
    console.log(wipData, 'wipData');
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    //orders
    const totalTurnOver = misData?.data.map(item => item?.orders ? item?.orders : 0);
    const shipped = misData?.data.map(item => item?.shipDone ? item?.shipDone : 0);
    const inHand = misData?.data.map(item => item?.inHand ? item?.inHand : 0);
    const canceled = misData?.data.map(item => item?.canceled ? item?.canceled : 0);

    //Shipped
    const shipDone = shippedData?.data.map(item => item?.shipped ? item.shipped : 0)
    const plTaken = shippedData?.data.map(item => item?.plTaken ? item.plTaken : 0)
    const plNotTaken = shippedData?.data.map(item => item?.plNotTaken ? item.plNotTaken : 0)
    const ocrPend = shippedData?.data.map(item => item?.ocrPend ? item.ocrPend : 0)
    //ocrPEndData
    const ocrTotal = ocrPendData?.data.map(item => item?.ocrPend ? item.ocrPend : 0)
    const fabOcrPend = ocrPendData?.data.map(item => item?.fabOcrPend ? item.fabOcrPend : 0)
    const cutOcrPend = ocrPendData?.data.map(item => item?.cutOcrPend ? item.cutOcrPend : 0)
    const proOcrPend = ocrPendData?.data.map(item => item?.proOcrPend ? item.proOcrPend : 0)

    //wip Data
    const totalWip = wipData?.data.map(item => item?.noOfOrd ? item.noOfOrd : 0)
    const wipFabYarnData = wipData?.data.map(item => item?.wipFab ? item.wipFab : 0)
    const wipCutData = wipData?.data.map(item => item?.wipCut ? item.wipCut : 0)
    const wipProData = wipData?.data.map(item => item?.wipPro ? item.wipData : 0)

    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;

    const data = [
        {
            name: "Orders",
            borderColor: "#1F588B",
            value: `${(totalTurnOver || 0).toLocaleString()}`,
            previousValue: `${shipped || 0}`,
            change: `${inHand || 0}`,
            trend: `${canceled || 0}`
        }
        ,
        {
            name: "Shipped",
            borderColor: "#62AAA3",
            value: `${(shipDone || 0).toLocaleString()}`,
            previousValue: `${plTaken || 0}`,
            change: `${plNotTaken || 0}`,
            trend: `${ocrPend || 0}`
        },
        {
            name: "OCR Pending",
            borderColor: "border-[#96A669]",
            value: `${(ocrTotal || 0).toLocaleString()}`,
            previousValue: `${fabOcrPend || 0}`,
            change: `${(cutOcrPend || 0)}`,
            trend: `${(proOcrPend || 0)}`
        },
        {
            name: "WIP",
            borderColor: "border-[#D49B37]",
            value: `${(totalWip || 0).toLocaleString()}`,
            previousValue: `${wipFabYarnData || 0}`,
            change: `${wipCutData || 0}`,
            trend: `${wipProData || 0}`
        },
        {
            name: "Loss",
            borderColor: "border-[#D49B37]",
            value: `${(loss?.currentValue || 0).toLocaleString()}`,
            previousValue: `${loss?.prevValue || 0}`,
            change: `${getDifferenceInPercentage(loss?.prevValue || 0, loss?.currentValue || 0)}%`,
            trend: (loss?.prevValue < loss?.currentValue) ? UP_TREND_ICON : DOWN_TREND_ICON
        },
    ]
    const options1 = {
        height: 60,
        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return ""; // Hide x-axis labels
            },
            gridThickness: 0 // Hide the x-axis grid lines
        },
        axisY: {
            lineThickness: 0, // Hide the y-axis line
            tickLength: 0, // Hide the y-axis ticks
            labelFormatter: function () {
                return ""; // Hide y-axis labels
            },
            gridThickness: 0 // Hide the y-axis grid lines
        },
        toolTip: {
            enabled: true // Disable tooltip
        },
        legend: {
            enabled: false // Disable legend
        },
        backgroundColor: "transparent", // Set background color to transparent
        data: [{
            type: "stackedBar100",
            color: "#adb612",
            dataPoints: [
                { label: "Shipped", y: shipped[0] },
            ]
        }, {
            type: "stackedBar100",
            color: "#7f7f7f",
            dataPoints: [
                { label: "WIP", y: inHand[0] },
            ]
        },
        {
            type: "stackedBar100",
            color: "#7f7fer",
            dataPoints: [
                { label: "Canceled", y: canceled[0] },
            ]
        }]
    };
    const options2 = {
        height: 60,
        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return ""; // Hide x-axis labels
            },
            gridThickness: 0 // Hide the x-axis grid lines
        },
        axisY: {
            lineThickness: 0, // Hide the y-axis line
            tickLength: 0, // Hide the y-axis ticks
            labelFormatter: function () {
                return ""; // Hide y-axis labels
            },
            gridThickness: 0 // Hide the y-axis grid lines
        },
        toolTip: {
            enabled: true // Disable tooltip
        },
        legend: {
            enabled: false // Disable legend
        },
        backgroundColor: "transparent", // Set background color to transparent
        data: [
            {
                type: "stackedBar100",
                color: "#62AAA3",
                dataPoints: [
                    { label: "P&L Taken", y: plTaken[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#E74C3C",
                dataPoints: [
                    { label: "P&L Not Taken", y: plNotTaken[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#96A669",
                dataPoints: [
                    { label: "OCR Pending", y: ocrPend[0] },
                ]
            },]

    };
    const options3 = {
        height: 60,
        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return ""; // Hide x-axis labels
            },
            gridThickness: 0 // Hide the x-axis grid lines
        },
        axisY: {
            lineThickness: 0, // Hide the y-axis line
            tickLength: 0, // Hide the y-axis ticks
            labelFormatter: function () {
                return ""; // Hide y-axis labels
            },
            gridThickness: 0 // Hide the y-axis grid lines
        },
        toolTip: {
            enabled: true // Disable tooltip
        },
        legend: {
            enabled: false // Disable legend
        },
        backgroundColor: "transparent", // Set background color to transparent
        data: [
            {
                type: "stackedBar100",
                color: "#2196F3",
                dataPoints: [
                    { label: "P&L Taken", y: fabOcrPend[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#9B59B6",
                dataPoints: [
                    { label: "P&L Not Taken", y: cutOcrPend[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#4CAF50",
                dataPoints: [
                    { label: "Cancelled", y: proOcrPend[0] },
                ]
            },]

    };
    const options4 = {
        height: 60,
        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return ""; // Hide x-axis labels
            },
            gridThickness: 0 // Hide the x-axis grid lines
        },
        axisY: {
            lineThickness: 0, // Hide the y-axis line
            tickLength: 0, // Hide the y-axis ticks
            labelFormatter: function () {
                return ""; // Hide y-axis labels
            },
            gridThickness: 0 // Hide the y-axis grid lines
        },
        toolTip: {
            enabled: true // Disable tooltip
        },
        legend: {
            enabled: false // Disable legend
        },
        backgroundColor: "transparent", // Set background color to transparent
        data: [
            {
                type: "stackedBar100",
                color: "#D49B37",
                dataPoints: [
                    { label: "P&L Taken", y: wipFabYarnData[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#3498DB",
                dataPoints: [
                    { label: "P&L Not Taken", y: wipCutData[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#9B59B6",
                dataPoints: [
                    { label: "Cancelled", wipProData: 0 },
                ]
            },]

    };
    const options5 = {
        height: 60,

        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return ""; // Hide x-axis labels
            },
            gridThickness: 0 // Hide the x-axis grid lines
        },
        axisY: {
            lineThickness: 0, // Hide the y-axis line
            tickLength: 0, // Hide the y-axis ticks
            labelFormatter: function () {
                return ""; // Hide y-axis labels
            },
            gridThickness: 0 // Hide the y-axis grid lines
        },
        toolTip: {
            enabled: true // Disable tooltip
        },
        legend: {
            enabled: false // Disable legend
        },
        backgroundColor: "transparent", // Set background color to transparent
        data: [
            {
                type: "stackedBar100",
                color: "#adb612",
                dataPoints: [
                    { label: "P&L Taken", y: plTaken[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#7f7f7f",
                dataPoints: [
                    { label: "P&L Not Taken", y: plNotTaken[0] },
                ]
            },
            {
                type: "stackedBar100",
                color: "#7f7f7",
                dataPoints: [
                    { label: "Cancelled", y: 0 },
                ]
            },]

    };
    const colorsSet1 = ['#adb612', '#62AAA3', '#2196F3', '#D49B37', '#D49B37'];
    const colorsSet2 = ['#7f7f7f', '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C'];
    const colorsSet3 = ['#000000', '#96A669', '#4CAF50', '#9B59B6', '#3498DB'];

    return (
        <div className='flex justify-evenly w-full h-full '>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center '>
                    <CardWrapper name={val.name} >
                        <div className={`h-full flex flex-col justify-between items-between  bg-white border-4 cuttedBorder${i + 1} `}>
                            <div className='pt-2'>
                                <span className='  text-2xl font-bold'>
                                    {val.value}
                                </span>

                            </div>
                            <div className=' h-[2rem] flex items-center'>  <CanvasJSChart options={val.name === 'Orders' ? options1 : val.name === 'Shipped' ? options2 : val.name === 'OCR Pending' ? options3 : val.name === 'WIP' ? options4 : val.name === 'Loss' ? options2 : null} />

                            </div>
                            <div className=' flex justify-evenly items-center text-gray-800 text-[12px] h-[5%]'>
                                <span>
                                    <div className='text-sm'>{val.name === "Orders" ? "Shipped" : val.name === "Shipped" ? "P$L Taken" : val.name === "OCR Pending" ? "Yarn & Fab" : val.name === "WIP" ? "WIP Fab" : val.name}</div>
                                    <div className='text-xl font-semibold text-green-500' style={{ color: colorsSet1[i] }}>{val.previousValue}</div>
                                </span>
                                <span>
                                    <div className='text-sm'>{val.name === "Orders" ? "WIP" : val.name === "Shipped" ? "P$L Pending" : val.name === "OCR Pending" ? "Cutting" : val.name === "WIP" ? "WIP Cut" : val.name}</div>
                                    <div className='text-xl font-semibold text-blue-500' style={{ color: colorsSet2[i] }}>{val.change}</div>
                                </span>
                                <div className='  justify-center text-center'>
                                    <div className='text-sm'>{val.name === "Orders" ? "Canceled" : val.name === "Shipped" ? "OCR Pend" : val.name === "OCR Pending" ? "Production" : val.name === "WIP" ? "Production" : val.name}</div>
                                    <div className='text-xl font-semibold flex items-center justify-center text-red-500' style={{ color: colorsSet3[i] }}>
                                        {val.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardWrapper>
                </div>
            )}
        </div>


    )
}
export default OrderMgmtNumCard