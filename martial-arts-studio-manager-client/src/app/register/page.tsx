'use client';

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Register } from '../components/auth/Register';

export default function RegisterPage() {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Register</Card.Title>
                            <Register />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 