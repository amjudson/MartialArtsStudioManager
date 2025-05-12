'use client';

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

export default function DashboardPage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return null; // Middleware will handle redirect
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">Dashboard</h1>
            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Students</Card.Title>
                            <Card.Text>
                                Manage your martial arts students, track their progress, and handle memberships.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Inventory</Card.Title>
                            <Card.Text>
                                Track your equipment, uniforms, and other items in stock.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Sales</Card.Title>
                            <Card.Text>
                                Monitor your sales, track revenue, and manage transactions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 