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

const PoRegister = () => {
  const [year, setYear] = useState('')
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading, isFetching } = useGetPoRegisterQuery();
  const { data: finYear } = useGetFinYearQuery();

  let poData = useMemo(() => data?.data ? data.data : [], [data])
  poData = filterSearch(
    [
      { field: "finYr", searchValue: year },
    ],
    poData
  );

  console.log(year, 'jkj');

  poData = poData.map((row) => ({
    ...row,
    poDate: getMonthValue(row.poDate),
    dueDate: getMonthValue(row.dueDate),
  }));
  const columns = [
    { field: 'poNo', headerName: 'PO Number', flex: 1 },
    { field: 'poDate', headerName: 'PO Date', flex: 1 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    { field: 'supplier', headerName: 'Supplier', flex: 1 },
    { field: 'totalQty', headerName: 'Total Quantity', type: 'number', flex: 1 },
    { field: 'transaction', headerName: 'Transaction', flex: 1 },
    { field: 'finYr', headerName: 'finYr', flex: 1 },

    // {
    //   field: 'access',
    //   headerName: 'Access Level',
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => (
    //     <>
    //       <Helmet>
    //         <title>PoRegister | ReactDashX</title>
    //       </Helmet>
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
    //         {access === 'manager' && <SecurityOutlinedIcon />}
    //         {access === 'user' && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     </>
    //   ),
    // },
  ];

  const getRowId = (row) => row.poNo; // Assuming 'poNo' is unique for each row

  return (
    <div>
      <ul className='flex mx-5 '>
        <p >Select Year:</p>
        {(finYear?.data ? finYear.data : []).map((item, index) => (
          <li
            className='bg-green-200 hover:bg-green-500 flex gap-2 mr-2 mt-1 rounded-[4px] px-[4px]'
            onClick={() => setYear(item.finYear.toString())}
            key={index}
          >
            {item.finYear}
          </li>

        ))}
      </ul>

      <Box style={{ height: 400, width: "100%" }}>
        <ContextMenu />
        <DataGrid
          rows={poData}
          columns={columns}
          getRowId={getRowId}

          // slots={{ toolbar: CustomToolbar }}
          slotProps={{
            filterPanel: {
              sx: {
                maxWidth: "100vw"
              }
            },
            toolbar: {
              showQuickFilter: true
            }
          }}
          editMode="row"
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
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}

        />
      </Box></div>
  );
};

export default PoRegister;
