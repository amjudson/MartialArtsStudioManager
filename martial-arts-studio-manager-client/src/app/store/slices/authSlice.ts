import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationUser } from '../api/authApi';

interface AuthState {
    token: string | null;
    user: ApplicationUser | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; user: ApplicationUser }>) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        },
        initializeAuth: (state) => {
            const token = sessionStorage.getItem('token');
            const userJson = sessionStorage.getItem('user');
            
            if (token && userJson) {
                try {
                    const user = JSON.parse(userJson);
                    state.token = token;
                    state.user = user;
                    state.isAuthenticated = true;
                } catch (error) {
                    // If JSON parsing fails, clear the invalid data
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    state.token = null;
                    state.user = null;
                    state.isAuthenticated = false;
                }
            }
        }
    }
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated; 