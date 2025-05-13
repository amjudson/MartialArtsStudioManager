'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import StudentList from '../components/StudentList';

export default function StudentsPage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return null; // Middleware will handle redirect
    }

    return (
        <Container className="py-4">
            <StudentList />
        </Container>
    );
} 