import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, MIS_DASHBOARD } from "../../constants/apiUrl";


const MisDashboard = createApi({
    reducerPath: 'MisDashboard',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['MisDashboard'],
    endpoints: (builder) => ({
        getMisDashboard: builder.query({
            query: () => {
                return {
                    url: MIS_DASHBOARD,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['MisDashboard'],
        }),

    }),
})

export const {
    useGetMisDashboardQuery,
} = MisDashboard;

export default MisDashboard;