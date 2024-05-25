import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownCom from '../Ui Component/modelParam';

const FabStsChart = ({ fabStatus }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const seriesData = [
        {
            name: 'Received Orders',
            data: fabStatus.map(item => item.rec || 0)
        },
        {
            name: 'Pending Orders',
            data: fabStatus.map(item => item.pend || 0)
        }
    ];

    const categories = fabStatus.map(item => item.month);

    const [chartData, setChartData] = useState({
        series: seriesData,
        options: {
            chart: {
                type: 'bar',
                height: 450,
                stacked: true,
                stackType: '100%',
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        const seriesIndex = config.seriesIndex;
                        const dataPointIndex = config.dataPointIndex;
                        const value = chartData.series[seriesIndex].data[dataPointIndex];
                        setModalContent(value);
                        setShowModal(true);
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            colors: ['#16a34a', '#dc2626'],
            xaxis: {
                categories: categories,
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'top',
                offsetX: 0,
                offsetY: 0
            },
        }
    });

    useEffect(() => {
        setChartData(prevData => ({
            ...prevData,
            series: seriesData,
            options: {
                ...prevData.options,
                xaxis: {
                    categories: categories,
                }
            }
        }));
    }, [fabStatus]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    return (
        <div>
            <div id="html-dist">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={450} />
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg  flex h-44">
                        <div>
                            <h2>Value: {modalContent}</h2>
                            <DropdownCom />
                        </div>
                        <button onClick={closeModal} className="bg-red-500 h-5  text-white flex justify-end rounded items-center p-1">x</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FabStsChart;
