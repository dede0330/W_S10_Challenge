import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaSlice = createApi({
    reducerPath: 'pizzaSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Pizza'],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'history',
            providesTags: ['Pizza'],
        }),
        postAllOrders: builder.mutation({
            query: (body) => ({
                url: 'order',
                method: 'POST',
                body

            }),
            invalidatesTags: ['Pizza']
        })
    }),
})

export const { useGetAllOrdersQuery, usePostAllOrdersMutation } = pizzaSlice;
export default pizzaSlice;