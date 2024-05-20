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
                    url: `${ORD_MANAGEMENT}`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getShippedData: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getShippedData`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getOcrPending: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getOcrPending`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getWIPData: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getWIPData`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getProfitLossData: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getProfitLossData`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getCapPlanData: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getCapPlanData`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getFabStsData: builder.query({
            query: () => {
                return {
                    url: `${ORD_MANAGEMENT}/getFabStsData`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['ordManagement'],
        }),
        getYFActVsPln: builder.query({
            query: ({ params }) => {
                return {
                    url: `${ORD_MANAGEMENT}/getYFActVsPln`,
                    method: 'GET',
                    params,
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
    useGetShippedDataQuery,
    useGetOcrPendingQuery,
    useGetWIPDataQuery,
    useGetProfitLossDataQuery,
    useGetCapPlanDataQuery,
    useGetFabStsDataQuery,
    useGetYFActVsPlnQuery
} = ordManagement;

export default ordManagement;