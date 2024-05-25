import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetYFActVsPlnQuery } from '../../redux/service/orderManagement';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../redux/service/commonMasters';
import DropdownCom from '../../Ui Component/modelParam';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('')
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([])
    const [yearData, setYearData] = useState([])
    const { data: fabPlVsActFull, isLoading: isyfActVsPlLoadingFull } = useGetYFActVsPlnQuery({ params: { filterMonth: selectedMonth || '', filterSupplier: selectedBuyer || '', filterYear: selectedYear || '' } });
    console.log(selectedYear, 'selectedTear');
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const { data: month } = useGetMonthQuery({ params: { filterYear: selectedYear || '', filterBuyer: selectedBuyer || '' } })
    const { data: year } = useGetFinYearQuery({})
    console.log(year, 'finyr');
    useEffect(() => {
        if (buyer?.data || month?.data) {
            const buyerName = (buyer?.data ? buyer?.data : []).map((item) => item.buyerName);
            const monData = (month?.data ? month?.data : []).map((mon) => mon.month);
            const finYearData = (year?.data ? year?.data : []).map((year) => year.finYear)
            setBuyerNm(buyerName);
            setMonthData(monData);
            setYearData(finYearData)
        }
    }, [buyer, month, year]);

    const fabPlVsActFullDt = fabPlVsActFull?.data ? fabPlVsActFull?.data : [];

    const orderCount = fabPlVsActFullDt.length;
    const totalPlanned = fabPlVsActFullDt.reduce((total, order) => total + (order.planed || 0), 0);
    const totalActual = fabPlVsActFullDt.reduce((total, order) => total + (order.actual || 0), 0);

    const totalQty = fabPlVsActFullDt.reduce((total, order) => total + (order.qty || 0), 0)
    console.log(totalActual, 'toasl');
    const options = {
        chart: {
            type: 'line',
            scrollablePlotArea: {
                minWidth: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 2000 : orderCount < 85 ? 2500 : orderCount < 120 ? 3000 : orderCount < 140 ? 3500 : 300,
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
            title: {
                style: {
                    fontSize: '10px'
                }
            },
            categories: fabPlVsActFullDt.map((order) => order.ordeNo.toString()),
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
                text: 'Price',
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
                    return this.value.toLocaleString(); // Display full value without abbreviation
                }
            },
        },
        tooltip: {
            shared: true,
            split: true,
            stickOnContact: true,
            style: {
                fontSize: '10px'
            },
            formatter: function () {
                const points = this.points.map(point => point.y.toLocaleString());
                return `<b>Order No: ${this.x}</b><br/>Planned: ${points[0]}<br/>Actual: ${points[1]} `;
            }
        },
        plotOptions: {
            line: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
            }
        },
        series: [
            {
                name: 'Planned',
                data: fabPlVsActFullDt.map((order) => [order.orderNo, order.planed]),
            },
            {
                name: 'Actual',
                data: fabPlVsActFullDt.map((order) => [order.orderNo, order.actual]),
            },
        ],
    };


    const orderDataGridRows = [
        ...fabPlVsActFullDt.map((order, index) => ({
            id: index,
            serial: index + 1,
            orderNo: order.ordeNo,
            qty: order.qty,
            plannedPrice: (order.planed || 0).toFixed(2).toLocaleString(),
            actualPrice: (order.actual || 0).toFixed(2).toLocaleString(),
        })),
        { id: 'total', serial: '', orderNo: 'Total', qty: totalQty, plannedPrice: totalPlanned.toFixed(2).toLocaleString(), actualPrice: totalActual.toFixed(2).toLocaleString(), },
    ];

    const valueFormatter = ({ value }) => {
        const formattedValue = parseFloat(value ? value : 0).toFixed(2);
        return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const orderDataGridColumns = [
        { field: 'serial', headerName: 'S/No', maxWidth: 40, maxHeight: 15 },
        { field: 'orderNo', headerName: 'Order No', maxWidth: 90 },
        { field: 'qty', headerName: 'Qty', maxWidth: 20, align: 'right' },
        { field: 'plannedPrice', headerName: 'Planned Price', valueFormatter, flex: 1, align: 'right', headerAlign: 'right', maxWidth: 100 },
        { field: 'actualPrice', headerName: 'Actual Price', valueFormatter, align: 'right', headerAlign: 'right', maxWidth: 100 },
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
        return params.id === 'total' ? 'fontWeightBold' : '';
    };
    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="flex justify-end">
                    <div className='flex items-center'>
                        <label className='text-sm text-center pt-[2px]'>Select :</label>
                    </div>
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
                    />
                    {console.log(yearData, 'yearData')}
                </div>
                {console.log(selectedBuyer, selectedMonth, 'buyer')}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <div style={{ flex: '70%', minWidth: '70%' }} className='flex flex-col'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                            containerProps={{ style: { minWidth: '70%' } }}
                        />
                        <h2>Total Orders :{orderCount}</h2>
                    </div>
                    <div style={{ flex: '30%', minWidth: '30%', height: 420 }}>
                        <DataGrid
                            rows={orderDataGridRows}
                            columns={orderDataGridColumns}
                            editMode="row"
                            rowHeight={24}
                            hideFooterSelectedRowCount
                            columnHeaderHeight={30}

                            getRowClassName={getRowClassName}
                            paginationMode="server"

                            sx={{
                                '& .MuiDataGrid-columnHeader': {
                                    background: 'linear-gradient(180deg, #afafae, #ffffff)',
                                    textAlign: 'center',
                                    fontSize: '10px',
                                    fontWeight: '400',
                                    borderColor: '#E5E7EB',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    display: 'none'
                                }
                            }}
                            hideFooterPagination
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            disableColumnMenu
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
