import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constant/apiPath'
export interface IIndustry {
    industryName: string
    isActive: boolean
    level: number
    isLeaf: boolean
    path: string
    parentNodeId: any
    parentNode: any
    industryDetails: any[]
    id: number
}



// Define a service using a base URL and expected endpoints
export const IndustryAPI = createApi({
    reducerPath: 'industryApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllIndustry: builder.query<IIndustry[], void>({
            query: () => ({
                url: '/api/Industry/GetAllIndustry',
                method: 'GET',
            }),
        }),
        getIndustryById: builder.query<IIndustry, number>({
            query: (id) => ({
                url: `/api/Industry/GetIndustryById/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllIndustryQuery, useGetIndustryByIdQuery} = IndustryAPI