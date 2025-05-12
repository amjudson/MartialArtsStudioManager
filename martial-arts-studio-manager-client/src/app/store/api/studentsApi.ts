import { Student } from '../../types/Student';
import { baseApi } from './baseApi';

export const studentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudents: builder.query<Student[], void>({
            query: () => 'Students',
            providesTags: ['Student']
        }),
        getStudent: builder.query<Student, string>({
            query: (id) => `Students/${id}`,
            providesTags: (result, error, id) => [{ type: 'Student', id }]
        }),
        addStudent: builder.mutation<Student, Partial<Student>>({
            query: (student) => ({
                url: 'Students',
                method: 'POST',
                body: student
            }),
            invalidatesTags: ['Student']
        }),
        updateStudent: builder.mutation<void, { id: string; student: Partial<Student> }>({
            query: ({ id, student }) => ({
                url: `Students/${id}`,
                method: 'PUT',
                body: student
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }]
        }),
        deleteStudent: builder.mutation<void, string>({
            query: (id) => ({
                url: `Students/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Student']
        })
    })
});

export const {
    useGetStudentsQuery,
    useGetStudentQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} = studentsApi; 