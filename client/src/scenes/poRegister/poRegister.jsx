import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useGetPoDataQuery } from '../../redux/service/poData';
import { useMemo, useState } from 'react';
import React from "react"; // Don't forget to import React
import BarChart from '../../components/BarChart';


const columns = [
  {
    field: 'id', headerAlign: 'center', headerName: 'S.no', maxWidth: 70, sortable: false, colGroup: "id", fontWeight: 700, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        S.no
      </div>
    )
  },
  {

    field: 'supplier', headerAlign: 'center', headerName: 'Supplier', sortable: false, minWidth: 300, flex: 1, colGroup: "id", renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Supplier
      </div>
    )
  },

  {
    field: 'q1', type: "number", headerAlign: 'center', headerName: 'Q1', sortable: false, flex: 1, align: 'right', colGroup: "id", valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Q1
      </div>
    )
  },
  {
    field: 'q2', type: "number", headerAlign: 'center', headerName: 'Q2', sortable: false, flex: 1, align: 'right', color: 'black', valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Q2
      </div>
    )
  },
  {
    field: 'q3', type: "number", headerAlign: 'center', headerName: 'Q3', sortable: false, flex: 1, align: 'right', valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Q3
      </div>
    )
  },
  {
    field: 'q4', type: "number", headerAlign: 'center', headerName: 'Q4', sortable: false, flex: 1, align: 'right',
    valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Q4
      </div>
    )
  },
  {
    field: 'price', type: "number", headerAlign: 'center', headerName: 'Total Value', sortable: false, flex: 1, align: 'right',
    valueFormatter: ({ value }) => {
      const formattedValue = parseFloat(value ? value : '').toFixed(2);
      return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, renderHeader: params => (
      <div className='text-[15px] font-semibold '>
        Total Value
      </div>
    )
  },
];
const columnGroupingModel = [
  {
    groupId: 'Quarterly Details',
    children: [{ field: 'q1' }, { field: 'q2' }, { field: 'q3' }, { field: 'q4' }],
    headerAlign: 'center',

  },
];
function DataTable({ data, totals }) {
  const rowsWithIds = data.map((row, index) => ({ id: index + 1, ...row }));

  const getRowClassName = (params) =>
    `${params.row.id % 2 === 0 ? 'even' : 'odd'} ${gridClasses.row}`;


  const renderTotalCell = (column) => {
    const totalValue = totals[column.field];
    if (totalValue !== undefined) {
      return (
        <div key={column.field} className='font-semibold text-[13px]'>
          {totalValue.toFixed(2)}
        </div>
      );
    } else {
      return null;
    }
  };


  return (
    <DataGrid
      autoHeight={false}
      className=' custom-data-grid '
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
      disableColumnMenu
      disableRowSelectionOnClick

      getRowClassName={getRowClassName}

      sx={{
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: '#adb612',
          textAlign: 'center',
          fontSize: '17px',
          fontWeight: '500',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          borderStyle: 'solid',
          color: 'white',

        },

        fontSize: '12px',
        color: '#212121',
        borderWidth: 1,
        borderStyle: 'solid',
        '& .even': {
          backgroundColor: 'white',

        },
        '& .odd': {
          backgroundColor: '#ebe9e9',

        },
        '& .even:hover': {
          backgroundColor: 'white',

        },
        '& .odd:hover': {
          backgroundColor: '#ebe9e9',

        },
        '& .MuiDataGrid-titleContainer': {
          fontSize: '1rem', // Adjust the font size here
        },
        '& .MuiDataGrid-cell': {
          fontSize: '12.25px',
          fontWeight: ''

        },
        '& MuiDataGrid-iconButtonContainer ': {
          color: 'red'
        },
        '& .my-super-theme--naming-group': {
          color: 'red'
        },
      }}
      components={{
        Footer: () => (
          <div className='MuiDataGrid-footer flex  items-center w-full bg-white border-solid border-2 border-gray-300 '>
            <h1 className=' font-bold text-[16px] w-[40%] p-1'>Total</h1>
            {columns.map(column => (
              <div key={column.field} className='font-bold text-[18px] w-[60%] '>
                {column.renderFooter ? column.renderFooter(column) : renderTotalCell(column)}
              </div>
            ))}
          </div>
        ),
      }}
      editMode="row"
      columnWidth={100}
      rowHeight={28}
      hideFooterPagination
      hideFooterSelectedRowCount
    />
  );
}




export default function PoRegister({ year, month, date, selectedSupplier, selectedArticleId }) {
  console.log(selectedArticleId, 'seletitems');
  const { data } = useGetPoDataQuery({ finYearData: JSON.stringify(year || ''), filterMonth: JSON.stringify(month || ''), filterSupplier: JSON.stringify(selectedSupplier || ''), filterArticleId: JSON.stringify(selectedArticleId || '') });
  const poData = useMemo(() => (data?.data ? data.data : []), [data]);
  console.log(year, 'year');
  const totals = {
    q1: poData.reduce((sum, row) => sum + (row.q1 || 0), 0),
    q2: poData.reduce((sum, row) => sum + (row.q2 || 0), 0),
    q3: poData.reduce((sum, row) => sum + (row.q3 || 0), 0),
    q4: poData.reduce((sum, row) => sum + (row.q4 || 0), 0),
    price: poData.reduce((sum, row) => sum + (row.price || 0), 0),
  };
  console.log(totals, 'total');
  // const lowercaseMonth = month.map(mnt => mnt.toLowerCase());
  //  poData = poData.map((row) => ({
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

        <DataTable data={poData} totals={totals} />


      </div>
      <div>
        <Typography
          variant="h4"

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

