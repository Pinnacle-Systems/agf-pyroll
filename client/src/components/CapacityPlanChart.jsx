import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



export default function SimpleBarChart({ capPlanData }) {
    console.log(capPlanData);
    return (
        <BarChart
            width={600}
            height={470}
            series={[
                { data: capPlanData.map(item => item.booked), label: 'Booked', id: 'uvId' },
            ]}
            xAxis={[{ data: capPlanData.map(item => item.month), scaleType: 'band' }]}
        />
    );
}