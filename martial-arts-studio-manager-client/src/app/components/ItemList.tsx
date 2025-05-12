import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useGetItemsQuery, useDeleteItemMutation } from '../store/api';
import { Item } from '../types/Item';

interface ItemListProps {
    onEdit: (item: Item) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ onEdit }) => {
    const { data: items, isLoading, error } = useGetItemsQuery();
    const [deleteItem] = useDeleteItemMutation();

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(id).unwrap();
            } catch (error) {
                console.error('Failed to delete item:', error);
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
                Error loading items. Please try again later.
            </Alert>
        );
    }

    return (
        <Container>
            <Row className="g-4">
                {items?.map((item) => (
                    <Col key={item.id} xs={12} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    SKU: {item.sku}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Category:</strong> {item.category}<br />
                                    <strong>Price:</strong> ${item.price.toFixed(2)}<br />
                                    <strong>Stock:</strong> {item.stockQuantity}<br />
                                    <strong>Status:</strong> {item.isActive ? 'Active' : 'Inactive'}<br />
                                    {item.description}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={() => onEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
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
}; 