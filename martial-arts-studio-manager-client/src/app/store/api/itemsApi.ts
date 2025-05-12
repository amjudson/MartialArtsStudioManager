import { Item } from '../../types/Item';
import { baseApi } from './baseApi';

export const itemsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => 'Items',
            providesTags: ['Item']
        }),
        getItem: builder.query<Item, string>({
            query: (id) => `Items/${id}`,
            providesTags: (result, error, id) => [{ type: 'Item', id }]
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            query: (item) => ({
                url: 'Items',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ['Item']
        }),
        updateItem: builder.mutation<void, { id: string; item: Partial<Item> }>({
            query: ({ id, item }) => ({
                url: `Items/${id}`,
                method: 'PUT',
                body: item
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Item', id }]
        }),
        deleteItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `Items/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Item']
        })
    })
});

export const {
    useGetItemsQuery,
    useGetItemQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation
} = itemsApi; 