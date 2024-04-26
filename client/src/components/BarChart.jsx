import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarCharts() {
  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34], color: '#adb612' }, // Customize color for series 1
        { data: [51, 6, 49, 30], color: '#7f7f7f' }, // Customize color for series 2
        { data: [15, 25, 30, 50], color: '#303030' }, // Customize color for series 3

      ]}
      height={200}
      width={300}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
