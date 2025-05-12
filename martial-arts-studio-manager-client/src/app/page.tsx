'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectIsAuthenticated } from './store/slices/authSlice';
import { Container, Navbar, Tab, Tabs } from 'react-bootstrap';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';

export default function Home() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();

    React.useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return null; // This page will redirect, so no need to render anything
}
