import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, ORD_MANAGEMENT } from "../../constants/apiUrl";


const ordManagement = createApi({
    reducerPath: 'ordManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['ordManagement'],
    endpoints: (builder) => ({
        getOrdManagementData: builder.query({
            query: () => {
                return {
                    url: ORD_MANAGEMENT,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),

    }),
})

export const {
    useGetOrdManagementDataQuery,
} = ordManagement;

export default ordManagement;