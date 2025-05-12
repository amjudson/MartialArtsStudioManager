'use client';

import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAddStudentMutation } from '../store/api/apiSlice';

export default function AddStudentForm() {
    const [addStudent, { isLoading }] = useAddStudentMutation();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
            await addStudent({
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                email: formData.get('email') as string,
                phoneNumber: formData.get('phoneNumber') as string,
                beltRank: formData.get('beltRank') as string,
                dateOfBirth: new Date(formData.get('dateOfBirth') as string).toISOString(),
                joinDate: new Date().toISOString(),
                isActive: true
            }).unwrap();
            
            setSuccess(true);
            setError(null);
            form.reset();
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add student');
            setSuccess(false);
        }
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">Add New Student</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Student added successfully!</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        required
                        placeholder="Enter first name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        required
                        placeholder="Enter last name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phoneNumber"
                        required
                        placeholder="Enter phone number"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Belt Rank</Form.Label>
                    <Form.Select name="beltRank" required>
                        <option value="">Select belt rank</option>
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="Purple">Purple</option>
                        <option value="Brown">Brown</option>
                        <option value="Black">Black</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="dateOfBirth"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Student'}
                </Button>
            </Form>
        </Container>
    );
} 