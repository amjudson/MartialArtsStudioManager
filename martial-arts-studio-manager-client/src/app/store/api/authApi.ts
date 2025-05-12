import { baseApi } from './baseApi';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface AuthResponse {
    token: string;
}

interface ErrorResponse {
    message: string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/Auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (userData) => ({
                url: '/Auth/register',
                method: 'POST',
                body: userData
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation } = authApi; 