import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo1() {
  const data = [
    { value: 5, label: 'Q1', color: '#adb612' },
    { value: 10, label: 'Q2', color: '#7f7f7f' },
    { value: 25, label: 'Q3', color: '#303030' },

  ];

  const size = {
    width: 400,
    height: 400,
  };
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,

          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 100,
          cy: 100,
          data,
        }
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'medium',
        },
      }}
      {...size}
    />
  );
}