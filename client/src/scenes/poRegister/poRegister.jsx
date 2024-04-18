import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetPoDataQuery } from '../../redux/service/poData';
import { useMemo, useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYearQuery } from '../../redux/service/finYear';
import { indexOf, isDate, keyBy } from 'lodash';
import { getMonthValue } from '../../helper/date';
import Item from "../../components/item";
import poRegister from './poParameters';
import React from "react"; // Don't forget to import React
import { CenterFocusStrong } from '@mui/icons-material';
import BarChart from '../../components/BarChart';
import { GridColumnHeaderParams } from '@mui/x-data-grid/internals';
import { color } from 'chart.js/helpers';
const columns = [
  {
    field: 'id', headerAlign: 'center', headerName: 'S.no', hide: true, maxWidth: 60, colGroup: "id", fontWeight: 700, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        S.no
      </div>
    )
  },
  {

    field: 'supplier', headerAlign: 'center', headerName: 'Supplier', minWidth: 300, flex: 1, colGroup: "id", renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        supplier
      </div>
    )
  },

  {
    field: 'q1', headerAlign: 'center', headerName: 'Q1', flex: 1, align: 'right', colGroup: "id", valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        Q1
      </div>
    )
  },
  {
    field: 'q2', headerAlign: 'center', headerName: 'Q2', flex: 1, align: 'right', color: 'black', valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        Q2
      </div>
    )
  },
  {
    field: 'q3', headerAlign: 'center', headerName: 'Q3', flex: 1, align: 'right', valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        Q3
      </div>
    )
  },
  {
    field: 'q4', headerAlign: 'center', headerName: 'Q4', flex: 1, align: 'right', valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        Q4
      </div>
    )
  },
  {
    field: 'price', headerAlign: 'center', headerName: 'Total Value', flex: 1, align: 'right',
    valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[17px] font-semibold '>
        Total Value
      </div>
    )
  },
];
const columnGroupingModel = [
  {
    groupId: 'Quarterly Review',
    children: [{ field: 'q1' }, { field: 'q2' }, { field: 'q3' }, { field: 'q4' }],
    headerAlign: 'center',

  },
];
function DataTable({ data }) {
  const rowsWithIds = data.map((row, index) => ({ id: index + 1, ...row }));
  return (
    <DataGrid className='grid h-[80%]'
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={columnGroupingModel}

      rows={rowsWithIds}
      columns={columns}
      columnHeaderHeight={"34"}
      showCellVerticalBorder={'2'}
      showColumnVerticalBorder={'10'}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      sx={{


        '& .MuiDataGrid-columnHeader': {
          backgroundColor: '#bedc12',
          textAlign: 'center',
          fontSize: '1.40rem',
          fontWeight: 'bold',
          borderColor: 'gray',
          borderWidth: 1,
          borderStyle: 'solid',
        },
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#212121',
        backgroundColor: 'white', borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
      }}
      editMode="row"
      columnWidth={100}
      rowHeight={28}

    />
  );
}

export default function PoRegister({ year, month, date }) {
  const { data } = useGetPoDataQuery();

  let poData = useMemo(() => data?.data ? data.data : [], [data])
  // const lowercaseMonth = month.map(mnt => mnt.toLowerCase()); poData = poData.map((row) => ({
  //   ...row,
  //   poDate: getMonthValue(row.poDate),
  //   dueDate: getMonthValue(row.dueDate),
  // }));

  // if (year.length > 0 || lowercaseMonth.length > 0) {
  //   poData = poData.filter((option) => {
  //     const yearMatch = year.length === 0 || year.includes(option.finYr);
  //     const monthMatch = lowercaseMonth.length === 0 || lowercaseMonth.some(mnt => {
  //       const dueDate = option.dueDate ? option.dueDate.toLowerCase() : '';
  //       const poDate = option.poDate ? option.poDate.toLowerCase() : '';
  //       return dueDate.includes(mnt) || poDate.includes(mnt);
  //     });

  //     return yearMatch && monthMatch
  //   });
  // }
  return (
    <div className='text-center align-center bg-gray-200 w-full h-full scrollbar overflow-auto'>
      <div className='h-[80%] overflow-auto'>
        <DataTable data={poData} />
      </div>
      <div>
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{ p: '20px 20px 0 20px' }}
        >
          Chart View
        </Typography>
        <Box height="80vh">
          <BarChart isDashboard="true" />
        </Box>
      </div>
    </div>


  );
}

