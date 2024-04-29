import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Lchart({ xAxisData, series1Data, series2Data }) {
  const size = {
    width: 400,
    height: 400,
  };
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }]}
      series={[
        {
          data: series1Data,
        },
        {
          data: series2Data,
        },
      ]}
      height={200}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}