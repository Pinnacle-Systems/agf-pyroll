import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Lchart({ xAxisData, series1Data, series2Data, series1Label = 'Planned', series2Label = 'Actual' }) {
  return (
    <LineChart
      xAxis={[{ data: xAxisData, scaleType: "point" }]}
      series={[
        {
          data: series1Data, label: series1Label
        },
        {
          data: series2Data, label: series2Label
        },
      ]}
      colors={["#34A853", "#4285F4"]}
      margin={{ left: 80 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}