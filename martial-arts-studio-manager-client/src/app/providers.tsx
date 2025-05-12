'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavbarComponent } from './components/Navbar';
import { initializeAuth } from './store/slices/authSlice';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        store.dispatch(initializeAuth());
    }, []);

    return (
        <Provider store={store}>
            <NavbarComponent />
            <main className="container py-4">
                {children}
            </main>
        </Provider>
    );
} 