import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetYFActVsPlnQuery } from '../../redux/service/orderManagement';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../redux/service/commonMasters';
import DropdownCom from '../../Ui Component/modelParam';
import { HiOutlineRefresh } from "react-icons/hi";
import DropdownData from '../../Ui Component/modelUi';
const ChartTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);

    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const { data: month } = useGetMonthQuery({ params: { filterYear: selectedYear || '', filterBuyer: selectedBuyer || '' } });
    const { data: year } = useGetFinYearQuery({});
    useEffect(() => {
        if (buyer?.data || month?.data || year?.data) {
            const buyerName = (buyer?.data ? buyer?.data : []).map((item) => item.buyerName);
            const monData = (month?.data ? month?.data : []).map((mon) => mon.month);
            const finYearData = (year?.data ? year?.data : []).map((year) => year.finYear);
            setBuyerNm(buyerName);
            setMonthData(monData);
            setYearData(finYearData);
        }
    }, [buyer, month, year]);
    const { data: fabPlVsActFull, isLoading: isyfActVsPlLoadingFull, refetch } = useGetYFActVsPlnQuery({ params: { filterMonth: selectedMonth || '', filterSupplier: selectedBuyer || '', filterYear: selectedYear || '' } });
    const fabPlVsActFullDt = fabPlVsActFull?.data ? fabPlVsActFull?.data : [];

    const orderCount = fabPlVsActFullDt.length;
    const totalPlanned = fabPlVsActFullDt.reduce((total, order) => total + (order.attrition || 0),
        0);

    const options = {
        chart: {
            type: 'column',
            height: 350,
            scrollablePlotArea: {
                minWidth: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 2000 : orderCount < 85 ? 2500 : orderCount < 120 ? 3000 : orderCount < 150 ? 3500 : 300,
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
            categories: fabPlVsActFullDt.map((order) => order.payPeriod),

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
                text: 'Attrition',
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
                    return this.value.toLocaleString();
                }
            },
        },
        plotOptions: {
            column: {
                pointWidth: 20,
                stacking: 'normal',
                states: {
                    hover: {
                        pointWidth: 20
                    }
                },
                marker: {
                    enabled: false
                },
            }
        },
        legend: {
            itemStyle: {
                fontWeight: 'bold'
            },
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 1,
        },
        series: [
            {
                name: 'Attrition',
                data: fabPlVsActFullDt.map((order) => ({
                    y: order.attrition,
                    color: '#ca1818'
                })),
                color: '#ca1818',
            },
        ],
    };

    const orderDataGridRows = [
        ...fabPlVsActFullDt.map((order, index) => ({
            id: index,
            serial: index + 1,
            payPeriod: order.payPeriod,
            customer: order.customer,
            attrition: order.attrition,
        })),
        {
            id: 'total', serial: '', payPeriod: 'Total', customer: '',
            attrition: totalPlanned.toLocaleString(),
        },
    ];

    const valueFormatter = ({ value }) => {
        const formattedValue = parseFloat(value ? value : 0).toLocaleString();
        return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const orderDataGridColumns = [
        { field: 'serial', headerName: 'S/No', maxWidth: 40 },

        { field: 'customer', headerName: 'Customer', maxWidth: 90 },
        { field: 'attrition', headerName: 'Attrition', valueFormatter, flex: 1, align: 'right', headerAlign: 'right', minWidth: 110 },
    ];

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '10px',
                    },
                    columnHeader: {
                        fontSize: '10px',
                        height: '36px',
                    },
                    cell: {
                        fontSize: '10px',
                        height: '2px',
                        textAlign: 'right',
                    },
                },
            },
        },
    });

    const getRowClassName = (params) => {
        const rowClass = params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-100' : 'bg-white';
        return params.id === 'total' ? 'fontWeightBold' : rowClass;
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="flex justify-end ">
                    <div className='flex items-center h-8  gap-1'>
                        <label className='text-sm text-center flex px-3  '>Select:</label>
                        <DropdownData selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                        <DropdownCom
                            selectedBuyer={selectedBuyer}
                            setSelectedBuyer={setSelectedBuyer}
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                            selectedYear={selectedYear}
                            setSelectedYear={setSelectedYear}
                            options={buyerNm}
                            monthOptions={monthData}
                            yearOptions={yearData}
                            columnHeaderHeight={"30"}
                        /> </div>
                    <div className='flex group relative'>
                        <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-5 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                            Refresh
                        </span>
                    </div>
                </div>
                {orderCount > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <div style={{ flex: '66%', minWidth: '66%' }} className='flex flex-col'>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                containerProps={{ style: { minWidth: '70%', height: '350px' } }}
                            />
                            {/* <h3 className='text-sm pt-1 pb-1 text-left font-bold'>Total Attrition : {totalPlanned.toLocaleString()}</h3> */}
                        </div>
                        {/* <div style={{ flex: '30%' }} className='flex flex-col'>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px', width: '100%', border: '0.5px solid #E0E0E0', borderRadius: '10px' }}>
                                    <DataGrid
                                        rows={orderDataGridRows}
                                        columns={orderDataGridColumns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        sx={{
                                            '& .MuiDataGrid-cell': {
                                                border: 'none',
                                                py: '5px',
                                            },
                                            '& .MuiDataGrid-columnHeaders': {
                                                borderBottom: 'none',
                                            },
                                            '& .MuiDataGrid-cell:focus': {
                                                outline: 'none',
                                            },
                                            '& .fontWeightBold': {
                                                fontWeight: 'bold',
                                                backgroundColor: '#dbe2e8',
                                            },
                                        }}
                                        getRowClassName={getRowClassName}
                                    />
                                </div>
                            </div> */}
                    </div>
                ) : (
                    <div>No Data Available</div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ChartTable;
