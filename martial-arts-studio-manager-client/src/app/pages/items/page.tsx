'use client';

import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { ItemList } from '../../components/ItemList';
import { ItemForm } from '../../components/ItemForm';
import { Item } from '../../types/Item';

export default function ItemsPage() {
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

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Items</h1>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Add New Item
                </Button>
            </div>

            <ItemList onEdit={handleEdit} />

            <Modal show={showForm} onHide={handleClose} size="lg">
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