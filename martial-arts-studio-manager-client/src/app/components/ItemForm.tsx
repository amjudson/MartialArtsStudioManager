import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAddItemMutation, useUpdateItemMutation } from '../store/api';
import { Item } from '../types/Item';

interface ItemFormProps {
    item?: Item;
    onSuccess: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ item, onSuccess }) => {
    const [addItem] = useAddItemMutation();
    const [updateItem] = useUpdateItemMutation();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        stockQuantity: 0,
        sku: '',
        isActive: true
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                description: item.description,
                category: item.category,
                price: item.price,
                stockQuantity: item.stockQuantity,
                sku: item.sku,
                isActive: item.isActive
            });
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (item) {
                await updateItem({ id: item.id, item: formData }).unwrap();
            } else {
                await addItem(formData).unwrap();
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save item:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>SKU</Form.Label>
                <Form.Control
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {item ? 'Update Item' : 'Add Item'}
            </Button>
        </Form>
    );
}; 