'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAddEquipmentMutation, useUpdateEquipmentMutation } from '../store/api/equipmentApi';
import { Equipment } from '../types/Equipment';

interface EquipmentFormProps {
    equipment?: Equipment;
    onSuccess?: () => void;
}

export default function EquipmentForm({ equipment, onSuccess }: EquipmentFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: 1,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
        lastMaintenanceDate: '',
        condition: 'New',
        isAvailable: true
    });

    const [addEquipment] = useAddEquipmentMutation();
    const [updateEquipment] = useUpdateEquipmentMutation();

    useEffect(() => {
        if (equipment) {
            setFormData({
                name: equipment.name,
                description: equipment.description,
                quantity: equipment.quantity,
                purchasePrice: equipment.purchasePrice,
                purchaseDate: new Date(equipment.purchaseDate).toISOString().split('T')[0],
                lastMaintenanceDate: equipment.lastMaintenanceDate 
                    ? new Date(equipment.lastMaintenanceDate).toISOString().split('T')[0]
                    : '',
                condition: equipment.condition,
                isAvailable: equipment.isAvailable
            });
        }
    }, [equipment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const equipmentData = {
                ...formData,
                purchasePrice: parseFloat(formData.purchasePrice.toString()),
                quantity: parseInt(formData.quantity.toString()),
                lastMaintenanceDate: formData.lastMaintenanceDate || undefined
            };

            if (equipment) {
                await updateEquipment({ 
                    id: equipment.id, 
                    equipment: equipmentData as Equipment 
                }).unwrap();
            } else {
                await addEquipment(equipmentData).unwrap();
            }
            onSuccess?.();
        } catch (err) {
            console.error('Failed to save equipment:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">{equipment ? 'Edit Equipment' : 'Add New Equipment'}</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Maintenance Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="lastMaintenanceDate"
                                value={formData.lastMaintenanceDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Condition</Form.Label>
                            <Form.Select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                            >
                                <option value="New">New</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        name="isAvailable"
                        label="Available for Use"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {equipment ? 'Update Equipment' : 'Add Equipment'}
                </Button>
            </Form>
        </Container>
    );
} 