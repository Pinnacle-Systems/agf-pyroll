import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataGrid } from '@mui/x-data-grid';
import { useGetYFActVsPlnQuery } from '../redux/service/orderManagement';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DropdownCom from '../Ui Component/modelParam';
import { useGetBuyerNameQuery } from '../redux/service/commonMasters';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [buyerNm, setBuyerNm] = useState([]);

    const { data: fabPlVsAct, isLoading: isyfActVsPlLoading } = useGetYFActVsPlnQuery({ params: { chart: true } });
    const { data: fabPlVsActFull, isLoading: isyfActVsPlLoadingFull } = useGetYFActVsPlnQuery({ params: {} });
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });

    useEffect(() => {
        if (buyer?.data) {
            const buyerNm = buyer.data.map((item) => item.buyerName,
            )
            setBuyerNm(buyerNm);
        }
    }, [buyer]);

    const fabPlAct = fabPlVsAct?.data ? fabPlVsAct?.data : [];
    const fabPlVsActFullDt = fabPlVsActFull?.data ? fabPlVsActFull?.data : [];

    console.log(fabPlAct, 'fabPlAct');

    const orderChartOptions = {
        chart: {
            type: 'line',
            animation: false,
        },
        title: {
            text: '',
            style: {
                fontSize: '14px'
            }
        },
        series: [
            {
                name: 'Planned',
                data: fabPlAct.map((order) => [order.orderNo, order.planed]),
            },
            {
                name: 'Actual',
                data: fabPlAct.map((order) => [order.orderNo, order.actual]),
            },
        ],
        xAxis: {
            title: {
                text: 'Order No',
                style: {
                    fontSize: '12px'
                }
            },
            categories: fabPlAct.map((order) => order.PlanMnth.toString()),
            labels: {
                style: {
                    fontSize: '10px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Price',
                style: {
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    fontSize: '10px'
                }
            }
        },
        tooltip: {
            shared: true,
            split: true,
            stickOnContact: true,
            style: {
                fontSize: '10px'
            }
        },
    };

    const orderDataGridRows = fabPlVsActFullDt.map((order, index) => ({
        id: index,
        orderNo: order.ordeNo,
        month: order.PlanMnth,
        plannedPrice: order.planed.toFixed(2),
        actualPrice: order.actual.toFixed(2),

    }));

    const orderDataGridColumns = [
        { field: 'orderNo', headerName: 'Order No', width: 150 },
        { field: 'month', headerName: 'Month', width: 150 },
        { field: 'plannedPrice', headerName: 'Planned Price', width: 150 },
        { field: 'actualPrice', headerName: 'Actual Price', width: 150 },
    ];

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '12px',
                    },
                    columnHeader: {
                        fontSize: '12px',
                    },
                    cell: {
                        fontSize: '12px',
                    },
                },
            },
        },
    });
    console.log(buyerNm, 'buyerNm');
    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <div className="flex justify-end">
                            <DropdownCom
                                selectedBuyer={selectedBuyer}
                                setSelectedBuyer={setSelectedBuyer}
                                options={buyerNm}
                            />
                        </div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={orderChartOptions}
                        />
                    </div>
                    <div style={{ flex: 1, height: 400 }}>
                        <DataGrid rows={orderDataGridRows} columns={orderDataGridColumns} />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
