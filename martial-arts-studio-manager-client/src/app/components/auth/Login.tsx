'use client';

import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { authApi } from '../../store/api/authApi';
import { setCredentials } from '../../store/slices/authSlice';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const router = useRouter();
    const dispatch = useDispatch();
    const [login] = authApi.useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({ token: result.token, user: result.user }));
            router.push('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Login</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}; 