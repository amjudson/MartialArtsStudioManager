'use client';

import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { ItemList } from '../components/ItemList';
import { ItemForm } from '../components/ItemForm';
import { Item } from '../types/Item';

export default function ItemsPage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | undefined>();

    const handleClose = () => {
        setShowForm(false);
        setSelectedItem(undefined);
    };

    const handleEdit = (item: Item) => {
        setSelectedItem(item);
        setShowForm(true);
    };

    if (!isAuthenticated) {
        return null; // Middleware will handle redirect
    }

    return (
        <Container className="py-4">
            <ItemList onEdit={handleEdit} />
            
            <Modal show={showForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedItem ? 'Edit Item' : 'Add New Item'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemForm
                        item={selectedItem}
                        onSuccess={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
} 