import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetPlanedVsActualSalesQuery } from '../../redux/service/orderManagement';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../redux/service/commonMasters';
import DropdownCom from '../../Ui Component/modelParam';

const OrderVsShipped = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('')
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([])
    const [yearData, setYearData] = useState([])
    const { data: plannedVsActualSales } = useGetPlanedVsActualSalesQuery({ params: {} });
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
    console.log(plannedVsActualSales, 'sales');
    const planVsActSales = plannedVsActualSales?.data ? plannedVsActualSales?.data : [];
    const orderCount = planVsActSales.length;

    const options = {
        chart: {
            type: 'bar',
            backgroundColor: '#ffffff',
            scrollablePlotArea: {
                minHeight: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 2000 : orderCount < 85 ? 3500 : orderCount < 120 ? 4000 : orderCount < 150 ? 3500 : 4000,
                scrollPositionX: 0
            },
            height: 450
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: planVsActSales.map((item) => item.orderNo),
            title: {
                text: 'Order No'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            },
            labels: {
                format: '{value}%'
            },
            verticalAlign: 'top',
            layout: 'horizontal',
            paddingLeft: ''
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal'
        },
        plotOptions: {
            series: {
                stacking: 'percent',
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },
        series: [
            {
                name: 'Planned',
                data: planVsActSales.map((item) => item.planSalesVal)
            },
            {
                name: 'Actual',
                data: planVsActSales.map((item) => item.actSalesVal)
            },
        ]
    };

    return (
        <div className='bg-white' style={{ minWidth: '100%', }}>
            <div className="flex justify-end w-[50%] h-[1.5rem] z-40 ">
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
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { minHeight: '100%' } }}
            />
        </div>
    );
};

export default OrderVsShipped;
