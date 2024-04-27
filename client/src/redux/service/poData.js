import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, PO_DATA } from "../../constants/apiUrl";


const poData = createApi({
    reducerPath: 'poData',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['poData'],
    endpoints: (builder) => ({
        getPoData: builder.query({
            query: (params) => {
                return {
                    url: `${PO_DATA}`,
                    method: 'GET',
                    params,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            providesTags: ['getSupplier'],
        }),
        getFinYr: builder.query({
            query: () => {
                return {
                    url: `${PO_DATA}/getFinYr`,
                    method: 'GET',
                }
            }
        }),
        getSupplier: builder.query({
            query: () => {
                return {
                    url: `${PO_DATA}/getSupplier`,
                    method: 'GET',
                }
            }
        }),
        getArticleId: builder.query({
            query: () => {
                return {
                    url: `${PO_DATA}/getArticleId`,
                    method: 'GET',
                }
            }
        }),
        getSuppEfficency: builder.query({
            query: () => {
                return {
                    url: `${PO_DATA}/getSuppEfficency`,
                    method: 'GET',
                }
            }
        }),
    }),
})

export const {
    useGetPoDataQuery,
    useGetFinYrQuery,
    useGetSupplierQuery,
    useGetArticleIdQuery,
    useGetSuppEfficencyQuery,
} = poData;

export default poData;