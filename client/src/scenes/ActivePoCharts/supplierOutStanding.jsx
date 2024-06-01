import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const data = [
    ['Delhi', 31.18, 1484, 250],
    ['Tokyo', 37.33, 2194, 2017],
    ['Shanghai', 27.79, 14922, 118],
    ['Sao Paulo', 22.23, 7946, 760],
    ['Mexico City', 21.91, 1485, 3930],
    ['Dhaka', 21.74, 2161, 32],
    ['Cairo', 21.32, 2734, 23],
    ['Beijing', 20.89, 12796, 2303],
    ['Mumbai', 20.67, 4355, 14],
    ['Osaka', 19.11, 225, 3],
    ['Karachi', 16.45, 3530, 10],
    ['Chongqing', 16.38, 5472, 2797],
    ['Istanbul', 15.41, 5343, 537],
    ['Buenos Aires', 15.25, 4758, 25],
    ['Kolkata', 14.974, 1886, 9],
    ['Kinshasa', 14.97, 9965, 240],
    ['Lagos', 14.86, 2706, 41],
    ['Manila', 14.16, 619, 108],
    ['Tianjin', 13.79, 5609, 1078],
    ['Guangzhou', 13.64, 19870, 21]
];

const columns = [
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'population', headerName: 'Population (mln)', width: 150 },
    { field: 'metroArea', headerName: 'Metro Area (km²)', width: 150 },
    { field: 'elevation', headerName: 'Highest Elevation (m)', width: 150 }
];

const rows = data.map((row, index) => ({
    id: index,
    city: row[0],
    population: row[1],
    metroArea: row[2],
    elevation: row[3]
}));

const chartOptions = (title, yAxisTitle, dataIndex) => ({
    chart: {
        type: 'bar',
        height: 400,
        zooming: {
            type: 'x'
        }
    },
    title: {
        text: title
    },
    xAxis: {
        categories: data.map(row => row[0]),
        title: {
            text: 'City'
        }
    },
    yAxis: {
        title: {
            text: yAxisTitle
        }
    },
    series: [{
        name: title,
        data: data.map(row => row[dataIndex])
    }],
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    }
});

const SupplierOutStanding = () => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center" gap={4}>
            <Box display="flex" justifyContent="space-around" width="100%">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions('Population', 'Population (mln)', 1)}
                />

            </Box>
            <Box height={400} width="100%">
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
        </Box>
    );
};

export default SupplierOutStanding;
