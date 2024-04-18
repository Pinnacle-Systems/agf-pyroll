import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Helmet } from 'react-helmet';
import { useGetPoRegisterQuery } from '../../redux/service/poRegister';
import { useMemo, useState } from 'react';
import { filterSearch } from '../../helper/helper';
import { useGetFinYearQuery } from '../../redux/service/finYear';
import { isDate, keyBy } from 'lodash';
import { getMonthValue } from '../../helper/date';
import ContextMenu from '../../components/ContextMenu';
import Item from "../../components/item";
import poRegister from './poParameters';
import React from "react"; // Don't forget to import React
import { CenterFocusStrong } from '@mui/icons-material';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';

const columns = [
  { field: 'poNo', headerName: 'PO Number', minWidth: 200, flex: 1 },
  { field: 'poDate', headerName: 'PO Date', minWidth: 100, flex: 1 },
  { field: 'dueDate', headerName: 'Due Date', minWidth: 100, flex: 1 },
  { field: 'supplier', headerName: 'Supplier', minWidth: 100, flex: 1 },
  { field: 'totalQty', headerName: 'Total Quantity', type: 'number', flex: 1 },
  // { field: 'transaction', headerName: 'Transaction', flex: 1 },
  { field: 'finYr', headerName: 'finYr', flex: 1 },

];

function DataTable({ data }) {
  const getRowId = (row) => row.poId;
  return (
    <Box style={{ height: 500, width: '70vw', }}>
      <DataGrid className='grid text-xs'
        rows={data}
        columns={columns}
        columnHeaderHeight={"38"}
        showCellVerticalBorder={'20'}
        showColumnVerticalBorder={'10'}
        getRowId={getRowId}

        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        sx={{
          '& .MuiDataGrid-columnHeader': {
            textAlign: 'center',
            fontSize: '0.90rem'

          },
          fontSize: '0.75rem',
          color: 'black'
        }}
        editMode="row"


        columnWidth={100}
        rowHeight={28}

        initialState={{
          columns: {
            columnVisibilityModel: {
              remainingTerm: false
            }
          },
          filter: {
            filterModel: {
              items: [],
              quickFilterExcludeHiddenColumns: true
            }
          },

        }}
      />
    </Box>
  );
}

export default function PoRegister({ year, month, date }) {
  const { data } = useGetPoRegisterQuery();
  console.log(date, 'year');

  let poData = useMemo(() => data?.data ? data.data : [], [data])
  const lowercaseMonth = month.map(mnt => mnt.toLowerCase()); poData = poData.map((row) => ({
    ...row,
    poDate: getMonthValue(row.poDate),
    dueDate: getMonthValue(row.dueDate),
  }));

  if (year.length > 0 || lowercaseMonth.length > 0) {
    poData = poData.filter((option) => {
      const yearMatch = year.length === 0 || year.includes(option.finYr);
      const monthMatch = lowercaseMonth.length === 0 || lowercaseMonth.some(mnt => {
        const dueDate = option.dueDate ? option.dueDate.toLowerCase() : '';
        const poDate = option.poDate ? option.poDate.toLowerCase() : '';
        return dueDate.includes(mnt) || poDate.includes(mnt);
      });
      // const dateMatch = filterSearch(
      //   [
      //     { field: "finYr", searchValue: date.toString() },
      //   ],
      //   poData
      // );
      return yearMatch && monthMatch
    });
  }
  return (
    <div className='ml-1 flex  text-center align-center w-[72vw] h-[80vh] bg-gray-200  '>
      <div className=' flex flex-col scrollbar'>
        {/* <div>
          <Item content={<DataTable data={poData} />} height={500} />
        </div> */}
        <div>
          <Typography
            variant="h4"
            fontWeight="600"
            sx={{ p: '20px 20px 0 20px' }}
          >
            Chart View
          </Typography>          <Box height="80vh" mt="-20px">
            <BarChart isDashboard="true" />
          </Box>
        </div>
      </div>
    </div>


  );
}

