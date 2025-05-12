import { Sale } from '../../types/Sale';
import { baseApi } from './baseApi';

export const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query<Sale[], void>({
            query: () => 'Sales',
            providesTags: ['Sale']
        }),
        getSale: builder.query<Sale, string>({
            query: (id) => `Sales/${id}`,
            providesTags: (result, error, id) => [{ type: 'Sale', id }]
        }),
        getStudentSales: builder.query<Sale[], string>({
            query: (studentId) => `Sales/student/${studentId}`,
            providesTags: (result, error, studentId) => [{ type: 'Sale', studentId }]
        }),
        addSale: builder.mutation<Sale, Partial<Sale>>({
            query: (sale) => ({
                url: 'Sales',
                method: 'POST',
                body: sale
            }),
            invalidatesTags: ['Sale', 'Item']
        }),
        updateSale: builder.mutation<void, { id: string; sale: Partial<Sale> }>({
            query: ({ id, sale }) => ({
                url: `Sales/${id}`,
                method: 'PUT',
                body: sale
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Sale', id }, 'Item']
        }),
        deleteSale: builder.mutation<void, string>({
            query: (id) => ({
                url: `Sales/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Sale', 'Item']
        })
    })
});

export const {
    useGetSalesQuery,
    useGetSaleQuery,
    useGetStudentSalesQuery,
    useAddSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation
} = salesApi; 