'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Student } from '../types/Student';
import { BeltRank } from '../types/BeltRank';
import { useAddStudentMutation, useUpdateStudentMutation } from '../store/api/studentsApi';
import { useGetBeltRanksQuery } from '../store/api/beltRanksApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface StudentFormProps {
    student?: Student;
    onSuccess: () => void;
}

interface StudentFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    joinDate: Date;
    beltRankId: number;
}

export function StudentForm({ student, onSuccess }: StudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
        joinDate: new Date(),
        beltRankId: 1 // Default to White belt (ID: 1)
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [addStudent, { isLoading: isCreating, error: createError }] = useAddStudentMutation();
    const [updateStudent, { isLoading: isUpdating, error: updateError }] = useUpdateStudentMutation();
    const { data: beltRanks, isLoading: isLoadingBeltRanks, error: beltRanksError } = useGetBeltRanksQuery();

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                phoneNumber: student.phoneNumber,
                dateOfBirth: new Date(student.dateOfBirth),
                joinDate: new Date(student.joinDate),
                beltRankId: student.beltRankId
            });
        }
    }, [student]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'phoneNumber') {
            // Remove all non-digit characters
            const digits = value.replace(/\D/g, '');
            
            // Format as (000)000-0000
            let formatted = '';
            if (digits.length > 0) {
                formatted = '(' + digits.substring(0, 3);
                if (digits.length > 3) {
                    formatted += ')' + digits.substring(3, 6);
                    if (digits.length > 6) {
                        formatted += '-' + digits.substring(6, 10);
                    }
                }
            }
            
            setFormData(prev => ({ ...prev, [name]: formatted }));
        } else if (name === 'beltRankId') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (date: Date | null, field: 'dateOfBirth' | 'joinDate') => {
        if (date) {
            setFormData(prev => ({ ...prev, [field]: date }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const submitData = {
                ...formData,
                dateOfBirth: format(formData.dateOfBirth, 'MM/dd/yyyy'),
                joinDate: format(formData.joinDate, 'MM/dd/yyyy'),
                isActive: true
            };

            if (student) {
                await updateStudent({ id: student.id, student: submitData }).unwrap();
            } else {
                await addStudent(submitData).unwrap();
            }
            onSuccess();
        } catch (err) {
            setError('Failed to save student');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingBeltRanks) {
        return <div>Loading belt ranks...</div>;
    }

    if (beltRanksError) {
        return <Alert variant="danger">Failed to load belt ranks</Alert>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(000)000-0000"
                    maxLength={14}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Join Date</Form.Label>
                <DatePicker
                    selected={formData.joinDate}
                    onChange={(date) => handleDateChange(date, 'joinDate')}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Belt Rank</Form.Label>
                <Form.Select
                    name="beltRankId"
                    value={formData.beltRankId}
                    onChange={handleChange}
                    required
                >
                    {beltRanks?.map(rank => (
                        <option key={rank.id} value={rank.id}>
                            {rank.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onSuccess}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : student ? 'Update' : 'Create'}
                </Button>
            </div>
        </Form>
    );
} 