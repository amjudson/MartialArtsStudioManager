export { baseApi } from './baseApi';
export { studentsApi } from './studentsApi';
export { itemsApi } from './itemsApi';
export { salesApi } from './salesApi';

// Re-export all hooks
export {
    useGetStudentsQuery,
    useGetStudentQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} from './studentsApi';

export {
    useGetItemsQuery,
    useGetItemQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation
} from './itemsApi';

export {
    useGetSalesQuery,
    useGetSaleQuery,
    useGetStudentSalesQuery,
    useAddSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation
} from './salesApi'; 