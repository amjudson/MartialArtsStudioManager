'use client';

import { Container, Row, Col, Card, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useGetEquipmentQuery, useDeleteEquipmentMutation } from '../store/api/apiSlice';
import { Equipment } from '../types/Equipment';

interface EquipmentListProps {
    onEdit?: (equipment: Equipment) => void;
}

export default function EquipmentList({ onEdit }: EquipmentListProps) {
    const { data: equipment, isLoading, error } = useGetEquipmentQuery();
    const [deleteEquipment] = useDeleteEquipmentMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteEquipment(id).unwrap();
        } catch (err) {
            console.error('Failed to delete equipment:', err);
        }
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    Error: {error instanceof Error ? error.message : 'An error occurred'}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">Equipment Inventory</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {equipment?.map((item) => (
                    <Col key={item.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-start">
                                    <span>{item.name}</span>
                                    <Badge bg={item.isAvailable ? 'success' : 'danger'}>
                                        {item.isAvailable ? 'Available' : 'Unavailable'}
                                    </Badge>
                                </Card.Title>
                                <Card.Text>
                                    <strong>Description:</strong> {item.description}<br />
                                    <strong>Quantity:</strong> {item.quantity}<br />
                                    <strong>Condition:</strong> {item.condition}<br />
                                    <strong>Purchase Price:</strong> ${item.purchasePrice.toFixed(2)}<br />
                                    <strong>Purchase Date:</strong> {new Date(item.purchaseDate).toLocaleDateString()}<br />
                                    {item.lastMaintenanceDate && (
                                        <>
                                            <strong>Last Maintenance:</strong>{' '}
                                            {new Date(item.lastMaintenanceDate).toLocaleDateString()}
                                        </>
                                    )}
                                </Card.Text>
                                <div className="d-flex gap-2">
                                    {onEdit && (
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
} 