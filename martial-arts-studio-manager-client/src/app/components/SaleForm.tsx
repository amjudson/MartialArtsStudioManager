import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { 
    useAddSaleMutation, 
    useUpdateSaleMutation, 
    useGetItemsQuery, 
    useGetStudentsQuery 
} from '../store/api';
import { Sale } from '../types/Sale';

interface SaleFormProps {
    sale?: Sale;
    onSuccess: () => void;
}

export const SaleForm: React.FC<SaleFormProps> = ({ sale, onSuccess }) => {
    const [addSale] = useAddSaleMutation();
    const [updateSale] = useUpdateSaleMutation();
    const { data: items } = useGetItemsQuery();
    const { data: students } = useGetStudentsQuery();

    const [formData, setFormData] = useState({
        itemId: '',
        studentId: '',
        quantity: 1,
        notes: ''
    });

    useEffect(() => {
        if (sale) {
            setFormData({
                itemId: sale.itemId,
                studentId: sale.studentId || '',
                quantity: sale.quantity,
                notes: sale.notes || ''
            });
        }
    }, [sale]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (sale) {
                await updateSale({ id: sale.id, sale: formData }).unwrap();
            } else {
                await addSale(formData).unwrap();
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save sale:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Item</Form.Label>
                <Form.Select
                    name="itemId"
                    value={formData.itemId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an item</option>
                    {items?.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name} - ${item.price.toFixed(2)} (Stock: {item.stockQuantity})
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Student (Optional)</Form.Label>
                <Form.Select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                >
                    <option value="">No student</option>
                    {students?.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.firstName} {student.lastName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

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

            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {sale ? 'Update Sale' : 'Add Sale'}
            </Button>
        </Form>
    );
}; 