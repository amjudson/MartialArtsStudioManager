import { Equipment } from '../../types/Equipment';
import { baseApi } from './baseApi';

export const equipmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEquipment: builder.query<Equipment[], void>({
            query: () => 'Equipment',
            providesTags: ['Equipment']
        }),
        getEquipmentById: builder.query<Equipment, string>({
            query: (id) => `Equipment/${id}`,
            providesTags: (result, error, id) => [{ type: 'Equipment', id }]
        }),
        addEquipment: builder.mutation<Equipment, Partial<Equipment>>({
            query: (equipment) => ({
                url: 'Equipment',
                method: 'POST',
                body: equipment
            }),
            invalidatesTags: ['Equipment']
        }),
        updateEquipment: builder.mutation<void, { id: string; equipment: Partial<Equipment> }>({
            query: ({ id, equipment }) => ({
                url: `Equipment/${id}`,
                method: 'PUT',
                body: equipment
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Equipment', id }]
        }),
        deleteEquipment: builder.mutation<void, string>({
            query: (id) => ({
                url: `Equipment/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Equipment']
        })
    })
});

export const {
    useGetEquipmentQuery,
    useGetEquipmentByIdQuery,
    useAddEquipmentMutation,
    useUpdateEquipmentMutation,
    useDeleteEquipmentMutation
} = equipmentApi; 