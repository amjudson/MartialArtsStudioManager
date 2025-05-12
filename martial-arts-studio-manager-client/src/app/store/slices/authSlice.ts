import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
            Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove('token');
        },
        initializeAuth: (state) => {
            const token = Cookies.get('token');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            }
        }
    }
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated; 