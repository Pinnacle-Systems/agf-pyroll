import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Item from "../../components/item"
import { useGetPoRegisterQuery } from '../../redux/service/poRegister';
import { useMemo, useState } from 'react';
import { filterSearch } from '../../helper/helper';
import ContextMenu from "../../components/ContextMenu";
// import ContextMenu from "../../../components/ContextMenu"
// import CustomToolbar from "../../../components/CustomToolbar"
// import { paymentHistorySchema, paymentHistoryData } from "../data/debt"

const columns = [
    // ...paymentHistorySchema,
    {
        field: "supplier",
        headerName: "",
        sortable: false,
        flex: 1,
        minWidth: 90,
        maxWidth: 90,
        renderCell: () => {
            return (
                <Box>
                    <ContextMenu />
                </Box>
            )
        }
    }
]
const getRowId = (row) => row.poNo;
function DataTable() {
    const { data } = useGetPoRegisterQuery();
    let poData = useMemo(() => data?.data ? data.data : [], [data])

    return (
        <Box style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={poData}
                columns={columns}
                getRowId={getRowId}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
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
                            status: false,
                            category: false,
                            paymentMethod: false,
                            reference: false
                        }
                    },
                    filter: {
                        filterModel: {
                            items: [],
                            quickFilterExcludeHiddenColumns: true
                        }
                    },
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
            />
        </Box>
    )
}

export default function PoParameters() {

    return (
        <Item title="Filters" content={<DataTable />} height={500} />
    )
}
