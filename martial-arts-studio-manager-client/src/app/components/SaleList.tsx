import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useGetSalesQuery, useDeleteSaleMutation } from '../store/api';
import { Sale } from '../types/Sale';

interface SaleListProps {
    onEdit: (sale: Sale) => void;
}

export const SaleList: React.FC<SaleListProps> = ({ onEdit }) => {
    const { data: sales, isLoading, error } = useGetSalesQuery();
    const [deleteSale] = useDeleteSaleMutation();

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            try {
                await deleteSale(id).unwrap();
            } catch (error) {
                console.error('Failed to delete sale:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                Error loading sales. Please try again later.
            </Alert>
        );
    }

    return (
        <Container>
            <Row className="g-4">
                {sales?.map((sale) => (
                    <Col key={sale.id} xs={12} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {sale.item?.name || 'Unknown Item'}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {new Date(sale.saleDate).toLocaleDateString()}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Quantity:</strong> {sale.quantity}<br />
                                    <strong>Unit Price:</strong> ${sale.unitPrice.toFixed(2)}<br />
                                    <strong>Total:</strong> ${sale.totalPrice.toFixed(2)}<br />
                                    {sale.student && (
                                        <>
                                            <strong>Student:</strong> {sale.student.firstName} {sale.student.lastName}<br />
                                        </>
                                    )}
                                    {sale.notes && (
                                        <>
                                            <strong>Notes:</strong> {sale.notes}
                                        </>
                                    )}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={() => onEdit(sale)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(sale.id)}
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
}; 